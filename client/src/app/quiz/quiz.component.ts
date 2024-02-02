import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ccg-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnDestroy {
  
  open: boolean = false;

  private subscription: Subscription;

  constructor(public quiz: QuizService) {
    this.subscription = this.quiz.open$.subscribe(() => {
      this.open = true;
    });
  }

  close() {
    this.open = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}