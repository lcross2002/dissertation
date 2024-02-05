import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface IMultiAnswer {
  id: string;
  value: string;
}

export interface IMultiQuiz {
  quizType: 'multi';
  question: string;
  code: string;
  answers: IMultiAnswer[];
  correctId: string;
}

export interface IFillQuiz {
  quizType: 'fill';
  before: string;
  after: string;
  answer: string;
}

export interface IQuiz {
  quiz: Quiz;
  i: number;
  j: number
}

export type Quiz = IMultiQuiz | IFillQuiz;

@Injectable({providedIn: 'root'})
export class QuizService {

  quizIndex: number = 0;
  open$: Observable<IQuiz>;
  private openSubject: Subject<IQuiz>;
  private quizzes: Quiz[] = [
    {
      quizType: 'multi',
      question: 'Which comment should be added to this line of code:',
      code: 'i++;',
      answers: [
        {id: 'A', value: '// Increment i by 1'},
        {id: 'B', value: 'No comment should be added'},
        {id: 'C', value: '// Increase the i value by 1'},
        {id: 'D', value: '/** Increment i */'}
      ],
      correctId: 'B'
    }
  ];
  
  constructor() {
    this.openSubject = new Subject();
    this.open$ = this.openSubject.asObservable();

    this.shuffleArray(this.quizzes);
  }

  openQuiz(i: number, j: number) {
    this.openSubject.next({ quiz: this.generateQuiz(), i, j });
  }

  private shuffleArray(array: Quiz[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  private generateQuiz(): Quiz {
    if (!this.quizzes[this.quizIndex])
      this.quizIndex = 0;

    return this.quizzes[this.quizIndex];
  }
}