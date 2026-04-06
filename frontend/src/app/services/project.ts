import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the shape of our Project data to match the backend
export interface Project {
  _id?: string;
  title: string;
  description: string;
  requiredSkills: string[];
  location: string;
  status: 'Open' | 'Filled';
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Point this to your backend running on port 8000
  private apiUrl = 'http://localhost:8000/api/projects';

  constructor(private http: HttpClient) { }

  // 1. READ: Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // 2. CREATE: Add a new project
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // 3. UPDATE: Modify an existing project
  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  // 4. DELETE: Remove a project
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}