import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { QuizService, IMultiQuiz, IFillQuiz } from '../../services/quiz.service';
import { Subscription } from 'rxjs';
import { CellType, MazeService } from '../../services/maze.service';

@Component({
  selector: 'ccg-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnDestroy {
  
  multiQuiz?: IMultiQuiz;
  fillQuiz?: IFillQuiz;
  open: boolean = false;

  private i?: number;
  private j?: number;

  private disabled: string[] = [];
  private openSubscription: Subscription;
  private closeSubscription: Subscription;

  constructor(
    public quiz: QuizService,
    public maze: MazeService
  ) {
    this.openSubscription = this.quiz.open$.subscribe((q) => {
      if (q.quiz.quizType === 'multi') {
        this.multiQuiz = q.quiz;
        this.fillQuiz = undefined;
      } else if (q.quiz.quizType === 'fill') {
        this.fillQuiz = q.quiz;
        this.multiQuiz = undefined;
      }

      this.disabled = [];
      this.i = q.i;
      this.j = q.j;
      this.open = true;
    });

    this.closeSubscription = this.quiz.close$.subscribe(() => this.close());
  }

  close() {
    this.open = false;
  }

  multiClick(id: string) {
    if (id === this.multiQuiz?.correctId && this.i && this.j) {
      this.maze.clickedMaze[this.i][this.j] = true;
      this.maze.updateFog(this.i, this.j);
      this.maze.maze[this.i][this.j] = CellType.empty;
      this.quiz.quizIndex++;
      this.maze.increaseScore(5);
      this.close();
    } else {
      this.disabled.push(id);
      this.maze.subtractLife();
    }
  }

  isDisabled(id: string) {
    return this.disabled.includes(id);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open)
      this.open = false;
  }

  ngOnDestroy() {
    this.openSubscription.unsubscribe();
    this.closeSubscription.unsubscribe();
  }
}