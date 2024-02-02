import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './level/level.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LevelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  play: boolean = false;
}
