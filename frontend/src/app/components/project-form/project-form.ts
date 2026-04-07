import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService, Project } from '../../services/project';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  projectForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false; // Track if we are editing
  editingProjectId: string | undefined = undefined;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router // Inject router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Listen to see if we are editing a project
    this.subscription = this.projectService.currentProjectToEdit.subscribe(project => {
      if (project) {
        this.isEditMode = true;
        this.editingProjectId = project._id;
        
        // Patch the form with the existing data!
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          location: project.location,
          requiredSkills: project.requiredSkills,
          status: project.status
        });
      }
    });
  }

  // Unsubscribe when the component closes to prevent memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.projectService.clearEditProject(); // Clear the state
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      skillsInput: [''],
      requiredSkills: [[] as string[]],
      status: ['Open']
    });
  }

  addSkill(): void {
    const skillValue = this.projectForm.get('skillsInput')?.value?.trim();
    if (skillValue) {
      const currentSkills = this.projectForm.get('requiredSkills')?.value as string[];
      if (!currentSkills.includes(skillValue)) {
        this.projectForm.get('requiredSkills')?.setValue([...currentSkills, skillValue]);
      }
      this.projectForm.get('skillsInput')?.setValue(''); 
    }
  }

  removeSkill(skill: string): void {
    const currentSkills = this.projectForm.get('requiredSkills')?.value as string[];
    this.projectForm.get('requiredSkills')?.setValue(currentSkills.filter(s => s !== skill));
  }

  resetForm(): void {
    this.isEditMode = false;
    this.editingProjectId = undefined;
    this.isSubmitting = false;
    
    this.projectForm.reset({
      status: 'Open',
      requiredSkills: []
    });
    
    this.projectService.clearEditProject();
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;
    this.isSubmitting = true; // Button turns gray
    
    const { skillsInput, ...projectData } = this.projectForm.value;

    const request = this.isEditMode && this.editingProjectId
      ? this.projectService.updateProject(this.editingProjectId, projectData)
      : this.projectService.createProject(projectData);

    request.subscribe({
      next: (response) => {
        console.log('Success!', response);
        alert('Project saved successfully!');
        this.isSubmitting = false; // Reset button
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Frontend Error:', err);
        alert('Failed to save project. Check console for details.');
        this.isSubmitting = false; // Reset button so user can try again
      }
    });
  }
}