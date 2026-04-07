import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list';
import { ProjectFormComponent } from './components/project-form/project-form';

export const routes: Routes = [
  { path: '', component: ProjectListComponent },
  
  { path: 'create', component: ProjectFormComponent },
  
  { path: '**', redirectTo: '' }
];