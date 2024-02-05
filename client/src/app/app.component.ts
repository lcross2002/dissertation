import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './level/level.component';
import { QuizComponent } from './quiz/quiz.component';
import { Subscription } from 'rxjs';
import { MazeService } from '../services/maze.service';
import { EndComponent } from './end/end.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LevelComponent, QuizComponent, EndComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  play: boolean = false;

  scoreForm: FormControl;

  private subscription: Subscription;

  constructor(private maze: MazeService) {
    this.scoreForm = new FormControl(250, [Validators.required, Validators.pattern("^[0-9]*$")]);

    this.subscription = this.maze.startLevel$.subscribe(() => {
      this.play = false;

      setTimeout(() => {
       this.play = true; 
      }, 0);
    });
  }

  start() {
    this.play = true;
    this.maze.maxScore = this.scoreForm.value ?? 250;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
