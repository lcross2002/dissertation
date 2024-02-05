import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './level/level.component';
import { QuizComponent } from './quiz/quiz.component';
import { Subscription } from 'rxjs';
import { MazeService } from '../services/maze.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LevelComponent, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  play: boolean = false;

  private subscription: Subscription;

  constructor(private maze: MazeService) {
    this.subscription = this.maze.startLevel$.subscribe(() => {
      this.play = false;

      setTimeout(() => {
       this.play = true; 
      }, 0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
