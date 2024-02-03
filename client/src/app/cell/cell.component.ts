import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CellType, MazeService } from '../../services/maze.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'ccg-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent implements OnInit {
  @Input() i!: number;
  @Input() j!: number;
  @Input() cell!: CellType;

  cellType = CellType;
  clicked: boolean = false;

  constructor(
    public maze: MazeService,
    public quiz: QuizService,
  ) {}

  ngOnInit() {
    if (this.cell === CellType.entrance)
      this.clicked = true;
  }

  cellClick() {
    if (this.cell === CellType.empty) {
      this.maze.updateFog(this.i, this.j);
      this.clicked = true;
    } else if (this.cell === CellType.puzzle) {
      this.quiz.openQuiz();
    }
  }
}