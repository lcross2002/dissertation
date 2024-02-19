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
  explain: string;
}

export interface IFillQuiz {
  quizType: 'fill';
  before: string;
  after: string;
  answer: string;
  explain: string;
}

export interface IQuiz {
  quiz: Quiz;
  i: number;
  j: number
}

export type Quiz = IMultiQuiz | IFillQuiz;

@Injectable({providedIn: 'root'})
export class QuizService {

  get currentExplain() {
    return this.quizzes[this.quizIndex].explain;
  }

  quizIndex: number = 0;
  open$: Observable<IQuiz>;
  private openSubject: Subject<IQuiz>;
  
  close$: Observable<void>;
  private closeSubject: Subject<void>;

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
      correctId: 'B',
      explain: 'You should not add comments to self-explanatory lines of code'
    },
    {
      quizType: 'multi',
      question: 'Which is the best way of creating this variable in javascript?',
      code: 'node',
      answers: [
        {id: 'A', value: 'let n; // Node'},
        {id: 'B', value: 'let nodeForTheFileExplorerTree'},
        {id: 'C', value: 'let node;'},
      ],
      correctId: 'C',
      explain: 'variable names should be simple but still give enough information'
    },
    {
      quizType: 'multi',
      question: 'How should you use typescript to type a return value from a public function',
      code: '',
      answers: [
        {id: 'A', value: 'Create an inline type in the function declaration'},
        {id: 'B', value: 'Create an interface for the return type'},
        {id: 'C', value: 'Leave out the return type colon in the function declaration'},
      ],
      correctId: 'B',
      explain: 'interfaces are the best option so that those who use the public function can utilise it'
    },
    {
      quizType: 'multi',
      question: 'You have just fixed a bug that only occurs in a specific browser, but your implementation is unidiomatic, how should you comment it?',
      code: '',
      answers: [
        {id: 'A', value: '// Safari requires this extra check to do [xyz]'},
        {id: 'B', value: '// Safari bug'},
        {id: 'C', value: 'Don\'t write a comment'},
      ],
      correctId: 'A',
      explain: 'unidiomatic fixes for bugs should be properly commented to ensure maintainability'
    }
  ];
  
  constructor() {
    this.openSubject = new Subject();
    this.open$ = this.openSubject.asObservable();

    this.closeSubject = new Subject();
    this.close$ = this.closeSubject.asObservable();

    this.shuffleArray(this.quizzes);
  }

  openQuiz(i: number, j: number) {
    this.openSubject.next({ quiz: this.generateQuiz(), i, j });
  }

  closeQuiz() {
    this.closeSubject.next();
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