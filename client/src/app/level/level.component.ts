import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { MazeService } from '../../services/maze.service';
import { CellComponent } from '../cell/cell.component';
import { BossComponent } from '../boss/boss.component';
import { EndService } from '../../services/end.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'ccg-level',
  standalone: true,
  imports: [CommonModule, CellComponent, BossComponent],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnDestroy {
  time: number;
  
  private subscription: Subscription;

  constructor(
    public maze: MazeService,
    private quiz: QuizService,
    private end: EndService
  ) {
    maze.generateMaze();
    this.time = 60;

    const timer = interval(1000);

    this.subscription = timer.subscribe(() => {
      this.time = this.time - 1;

      if (this.time === 0) {
        this.ngOnDestroy();
        this.quiz.closeQuiz();
        this.end.end({
          outcome: 'lose',
          score: this.maze.score
        });
      }
    });
  }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
}