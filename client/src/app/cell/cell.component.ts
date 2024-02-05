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

  cellType = CellType;
  collectedBonus: boolean = false;
  
  get clickable() {
    return !this.clicked && this.maze.isAdjacentToClicked(this.i, this.j);
  }

  get clicked() {
    return this.maze.clickedMaze[this.i][this.j];
  }

  constructor(
    public maze: MazeService,
    public quiz: QuizService,
  ) {}

  cellClick() {
    if (!this.maze.isAdjacentToClicked(this.i, this.j))
      return;

    if (this.cell === CellType.empty) {
      this.maze.updateFog(this.i, this.j);
    } else if (this.cell === CellType.puzzle) {
      this.quiz.openQuiz(this.i, this.j);
    } else if(this.cell === CellType.key) {
      this.maze.hasKey = true;
      this.maze.clickedMaze[this.i][this.j] = true;
      this.maze.updateFog(this.i, this.j);
    } else if (this.cell === CellType.exit) {
      if (this.maze.hasKey) {
        this.maze.increaseScore(10);
        this.maze.startLevel();
      }
    } else if (this.cell === CellType.bonus) {
      this.collectedBonus = true;
      this.maze.updateFog(this.i, this.j);
      this.maze.bonus.push({ i: this.i, j: this.j });
      this.maze.increaseScore(10);
    }
  }

  keyPress(ev: KeyboardEvent) {
    if (ev.key === 'Enter')
      this.cellClick();
  }
}