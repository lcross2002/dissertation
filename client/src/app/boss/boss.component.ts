import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { EndService } from '../../services/end.service';
import { MazeService } from '../../services/maze.service';

@Component({
  selector: 'ccg-boss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boss.component.html',
  styleUrl: './boss.component.scss'
})
export class BossComponent {

  get hp() {
    return 3 - this.quiz.quizIndex;
  }

  constructor(
    private quiz: QuizService,
    private end: EndService,
    private maze: MazeService
  ) {
    this.quiz.quizIndex = 0;

    this.quiz.close$.subscribe(() => {
      if (this.hp === 0) {
        this.end.end({
          outcome: 'win',
          score: this.maze.score
        });
      }
    });
  }

  bossClick(): void {
    this.quiz.openQuiz(-999, -999);
  }

  keyPress(ev: KeyboardEvent) {
    if (ev.key === 'Enter')
      this.bossClick();
  }
}