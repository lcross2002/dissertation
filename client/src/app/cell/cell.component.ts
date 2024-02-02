import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CellType, MazeService } from '../../services/maze.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'ccg-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  @Input() i!: number;
  @Input() j!: number;
  @Input() cell!: CellType;

  constructor(
    public maze: MazeService,
    public quiz: QuizService,
  ) {}

  cellClick() {
    if (this.cell === CellType.empty) {
      this.maze.updateFog(this.i, this.j);
    } else if (this.cell === CellType.puzzle) {
      this.quiz.openQuiz();
    }
  }
}