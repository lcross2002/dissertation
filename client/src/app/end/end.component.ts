import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { EndService, IEnd } from '../../services/end.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ccg-end',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end.component.html',
  styleUrl: './end.component.scss'
})
export class EndComponent implements OnDestroy {
  
  val?: IEnd;

  private subscription: Subscription;
  
  constructor(public end: EndService) {
    this.subscription = this.end.end$.subscribe((val) => {
      this.val = val;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}