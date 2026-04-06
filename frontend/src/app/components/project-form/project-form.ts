import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      skillsInput: [''], // Temporary field to hold typed skills
      requiredSkills: [[] as string[]], // The actual array being sent
      status: ['Open']
    });
  }

  // Method to add a skill from the input field to the array
  addSkill(): void {
    const skillValue = this.projectForm.get('skillsInput')?.value?.trim();
    if (skillValue) {
      const currentSkills = this.projectForm.get('requiredSkills')?.value as string[];
      
      if (!currentSkills.includes(skillValue)) {
        this.projectForm.get('requiredSkills')?.setValue([...currentSkills, skillValue]);
      }
      
      this.projectForm.get('skillsInput')?.setValue(''); // Clear input
    }
  }

  // Method to remove a skill from the array
  removeSkill(skill: string): void {
    const currentSkills = this.projectForm.get('requiredSkills')?.value as string[];
    this.projectForm.get('requiredSkills')?.setValue(currentSkills.filter(s => s !== skill));
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.isSubmitting = true;
    
    // Extract everything except the temporary skillsInput field
    const { skillsInput, ...projectData } = this.projectForm.value;

    this.projectService.createProject(projectData).subscribe({
      next: (response) => {
        alert('Project created successfully!');
        this.projectForm.reset({ status: 'Open', requiredSkills: [] });
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error creating project:', err);
        this.isSubmitting = false;
      }
    });
  }
}