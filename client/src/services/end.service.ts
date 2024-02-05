import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IEnd {
  outcome: 'win' | 'lose';
  score: number;
}

@Injectable({providedIn: 'root'})
export class EndService {

  end$: Observable<IEnd>;
  private endSubject: Subject<IEnd>;

  constructor() {
    this.endSubject = new Subject();
    this.end$ = this.endSubject.asObservable();
  }

  end(end: IEnd) {
    this.endSubject.next(end);
  }
}