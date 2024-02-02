import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MazeService } from "../../services/maze.service";

@Component({
  selector: 'ccg-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent {
  constructor(public maze: MazeService) {
    maze.generateMaze();
    console.log(maze.maze);
    console.log(maze.fogMaze);
  }
}