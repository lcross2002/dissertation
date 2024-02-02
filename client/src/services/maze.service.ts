import { Injectable } from '@angular/core';

export enum CellType {
  empty,
  wall,
  entrance,
  exit,
  puzzle,
  key,
  bonus
}

export type MazeLine = [CellType, CellType, CellType, CellType, CellType, CellType, CellType];
export type Maze = [MazeLine, MazeLine, MazeLine, MazeLine, MazeLine, MazeLine, MazeLine];

export type FogLine = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export type FogMaze = [FogLine, FogLine, FogLine, FogLine, FogLine, FogLine, FogLine];

interface coord {
  i: number;
  j: number
}

@Injectable({providedIn: 'root'})
export class MazeService {
  maze!: Maze;
  fogMaze!: FogMaze;

  private maze1: Maze = [
    [1, 1, 1, 1, 1, 3, 1],
    [1, 5, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 4, 1],
    [1, 6, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 2, 1]
  ];

  generateMaze() {
    this.maze = this.maze1;
    this.generateFogMaze();
  }

  private generateFogMaze() {
    const fog: boolean[][] = [...Array(7)].map(e => Array(7));
    let above: coord | undefined;
    let left: coord | undefined;
    let right: coord | undefined;

    this.maze?.forEach((line, i) => {
      line.forEach((cell, j) => {
        if (cell === CellType.entrance) {
          fog[i][j] = false;
          
          above = {
            i: i-1,
            j: j,
          };

          left = {
            i: i,
            j: j-1
          };

          right = {
            i: i,
            j: j+1
          }
          
        } else {
          fog[i][j] = true;
        }
      });
    });

    if (above?.i && above.j && fog[above.i][above.j]) {
      fog[above.i][above.j] = false;
    }
    if (left?.i && left.j && fog[left.i][left.j]) {
      fog[left.i][left.j] = false;
    }
    if (right?.i && right.j && fog[right.i][right.j]) {
      fog[right.i][right.j] = false;
    }

    this.fogMaze = fog as FogMaze;
  }

  updateFog(i: number, j: number) {
    const left: coord = {i: i, j: j-1};
    const right: coord = {i: i, j: j+1};
    const up: coord = {i: i+1, j: j};
    const down: coord = {i: i-1, j: j};

    if (this.fogMaze[left.i][left.j])
      this.fogMaze[left.i][left.j] = false;

    if (this.fogMaze[right.i][right.j])
      this.fogMaze[right.i][right.j] = false;

    if (this.fogMaze[up.i][up.j])
      this.fogMaze[up.i][up.j] = false;

    if (this.fogMaze[down.i][down.j])
      this.fogMaze[down.i][down.j] = false;

  }
}