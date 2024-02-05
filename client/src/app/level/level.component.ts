import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'ccg-level',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent {
  constructor(public maze: MazeService) {
    maze.generateMaze();
  }
}