import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project';
import { Router } from '@angular/router'; // <-- ADD THIS

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  // Add router to the constructor
  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error fetching projects:', err)
    });
  }

  // ADD THIS METHOD
  editProject(project: Project): void {
    this.projectService.setEditProject(project); // Broadcast the project
    this.router.navigate(['/create']); // Navigate to the form page
  }

  deleteProject(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.projects = this.projects.filter(p => p._id !== id),
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }
}