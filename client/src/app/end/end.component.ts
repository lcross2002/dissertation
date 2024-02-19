import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { EndService, IEnd } from '../../services/end.service';
import { Subscription } from 'rxjs';
import { MazeService } from '../../services/maze.service';
import { QuizService } from '../../services/quiz.service';

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
  
  constructor(
    private maze: MazeService,
    public end: EndService,
    public quiz: QuizService
  ) {
    this.subscription = this.end.end$.subscribe((val) => {
      this.val = val;
    });
  }

  play() {
    this.maze.startGame();
    this.val = undefined;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}