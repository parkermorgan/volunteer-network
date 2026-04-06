import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list';
import { ProjectFormComponent } from './components/project-form/project-form';

export const routes: Routes = [
  // When a user visits the base URL, load the list
  { path: '', component: ProjectListComponent },
  
  // When a user visits /create, load the form
  { path: 'create', component: ProjectFormComponent },
  
  // Wildcard route to redirect any broken links back to the list
  { path: '**', redirectTo: '' }
];