import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface quiz {

}

@Injectable({providedIn: 'root'})
export class QuizService {

  open$: Observable<quiz>;
  private openSubject: Subject<quiz>;
  private quizIndex: number = 0;
  private quizzes: quiz[] = [];
  
  constructor() {
    this.openSubject = new Subject();
    this.open$ = this.openSubject.asObservable();
  }

  openQuiz() {
    this.openSubject.next(this.generateQuiz());
  }

  private generateQuiz(): quiz {
    return this.quizzes[this.quizIndex++];
  }
}