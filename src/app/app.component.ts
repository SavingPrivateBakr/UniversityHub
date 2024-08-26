import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './NavBar/NavBar';
@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RussianUniversities';
}
