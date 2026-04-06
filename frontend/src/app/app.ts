import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // <-- ADD THESE IMPORTS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // <-- ADD RouterLink AND RouterLinkActive HERE
  templateUrl: './app.html',
  styleUrl: './app.css' // (or app.component.css depending on how your file is named)
})
export class AppComponent {
  title = 'frontend';
}