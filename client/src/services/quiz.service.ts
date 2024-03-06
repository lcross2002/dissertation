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
    },
    {
      quizType: 'multi',
      question: 'Which of these CSS classes is best for a navigation bar item icon',
      code: '',
      answers: [
        {id: 'A', value: 'navItemIcon'},
        {id: 'B', value: 'nav-item-con'},
        {id: 'C', value: 'icon'},
        {id: 'D', value: 'nav__item--icon'},
      ],
      correctId: 'D',
      explain: 'the prefered css class naming method is Block Element Modifier'
    },
    {
      quizType: 'multi',
      question: 'Which of these ways is a bad way of overloading a function',
      code: '',
      answers: [
        {id: 'A', value: 'mult(one: number, two: number, three?: number): number {}'},
        {id: 'B', value: 'mult(one: number, two: number, three: number): number {}'},
        {id: 'C', value: 'both are bad'}
      ],
      correctId: 'C',
      explain: 'there is no need to overload this function, just implement the logic for "three" in the original function'
    },
    {
      quizType: 'multi',
      question: 'which is the best method of creating function declarations for a parameter that is two types',
      code: '',
      answers: [
        {id: 'A', value: 'use a union type'},
        {id: 'B', value: 'create overloads of the function'},
        {id: 'C', value: 'use any'},
        {id: 'D', value: 'use unknown and do type checking inside the function'},
      ],
      correctId: 'A',
      explain: 'best practice is to use union types'
    },
    {
      quizType: 'multi',
      question: 'What is the correct return type for a function that doesn\'t have a return value',
      code: '',
      answers: [
        {id: 'A', value: 'any'},
        {id: 'B', value: 'void'},
        {id: 'C', value: 'unknown'},
        {id: 'D', value: 'undefined'},
      ],
      correctId: 'B',
      explain: 'void stops anyone incorrectly using a return value that does not exist'
    },
    {
      quizType: 'multi',
      question: 'Which is the best way to name this variable x',
      code: 'let x = user.firstName; let y = user.lastName;',
      answers: [
        {id: 'A', value: 'name'},
        {id: 'B', value: 'fname'},
        {id: 'C', value: 'tmp'},
      ],
      correctId: 'B',
      explain: 'need to differentiate between the names, and they need to be descriptive'
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

  public shuffleQuizzes() {
    this.shuffleArray(this.quizzes);
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