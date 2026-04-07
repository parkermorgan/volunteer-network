import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api/projects';

  private projectToEdit = new BehaviorSubject<Project | null>(null);
  currentProjectToEdit = this.projectToEdit.asObservable();

  constructor(private http: HttpClient) { }

  setEditProject(project: Project) {
    this.projectToEdit.next(project);
  }

  clearEditProject() {
    this.projectToEdit.next(null);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}