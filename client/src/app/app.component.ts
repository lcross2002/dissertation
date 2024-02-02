import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './level/level.component';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LevelComponent, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  play: boolean = false;
}
