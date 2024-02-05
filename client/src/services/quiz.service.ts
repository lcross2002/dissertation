import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface IMultiAnswer {
  id: string;
  value: string;
}

export interface IMultiQuiz {
  quizType: 'multi';
  question: string;
  answers: IMultiAnswer[];
  correctId: string;
}

export interface IFillQuiz {
  quizType: 'fill';
  before: string;
  after: string;
  answer: string;
}

export type Quiz = IMultiQuiz | IFillQuiz;

@Injectable({providedIn: 'root'})
export class QuizService {

  open$: Observable<Quiz>;
  private openSubject: Subject<Quiz>;
  private quizIndex: number = 0;
  private quizzes: Quiz[] = [
    {
      quizType: 'multi',
      question: 'test',
      answers: [
        {id: 'A', value: 'test'},
        {id: 'B', value: 'test'},
        {id: 'C', value: 'test'},
        {id: 'D', value: 'test'}
      ],
      correctId: 'A'
    }
  ];
  
  constructor() {
    this.openSubject = new Subject();
    this.open$ = this.openSubject.asObservable();
  }

  openQuiz() {
    this.openSubject.next(this.generateQuiz());
  }

  private generateQuiz(): Quiz {
    return this.quizzes[this.quizIndex];
  }
}