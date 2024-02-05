import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { QuizService, IMultiQuiz, IFillQuiz } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

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

  private subscription: Subscription;

  constructor(public quiz: QuizService) {
    this.subscription = this.quiz.open$.subscribe((q) => {
      if (q.quizType === 'multi') {
        this.multiQuiz = q;
        this.fillQuiz = undefined;
      } else if (q.quizType === 'fill') {
        this.fillQuiz = q;
        this.multiQuiz = undefined;
      }

      this.open = true;
    });
  }

  close() {
    this.open = false;
  }

  multiClick(id: string) {
    console.log(id);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open)
      this.open = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}