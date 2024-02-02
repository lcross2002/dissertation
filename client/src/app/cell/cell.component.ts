import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CellType, MazeService } from '../../services/maze.service';

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

  constructor(public maze: MazeService) {}
}