import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuizService } from './quiz.service';
import { EndService } from './end.service';

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

export type ClickedLine = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export type ClickedMaze = [ClickedLine, ClickedLine, ClickedLine, ClickedLine, ClickedLine, ClickedLine, ClickedLine];

interface coord {
  i: number;
  j: number
}

@Injectable({providedIn: 'root'})
export class MazeService {
  isBoss: boolean = false;
  score: number = 0;
  streak: number = 0;
  maxScore: number = 250;
  lives: boolean[] = [true, true, true];
  hasKey: boolean = false;
  bonus: coord[] = [];
  maze!: Maze;
  fogMaze!: FogMaze;
  clickedMaze!: ClickedMaze;
  
  startLevel$: Observable<void>;
  private startLevelSubject: Subject<void>;

  constructor(
    private quiz: QuizService,
    private end: EndService
  ) {
    this.startLevelSubject = new Subject();
    this.startLevel$ = this.startLevelSubject.asObservable();
  }

  startGame() {
    this.isBoss = false;
    this.score = 0;
    this.streak = 0;
    this.lives = [true, true, true];
    this.startLevel();
  }

  startLevel() {
    this.startLevelSubject.next();
  }

  generateMaze() {
    const { mazes, length } = this.generateMazes();
    this.maze = mazes[Math.floor(Math.random() * length)];
    this.hasKey = false;
    this.bonus = [];
    this.generateFogMaze();
    this.generateClickedMaze();
  }

  private generateMazes(): {mazes: Maze[], length: number} {
    const mazes: Maze[] = [
      [
        [1, 1, 1, 1, 1, 3, 1],
        [1, 5, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 4, 1],
        [1, 6, 0, 4, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 2, 1]
      ],
      [
        [1, 1, 1, 3, 1, 1, 1],
        [1, 5, 4, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 6, 4, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1],
        [1, 6, 4, 0, 4, 0, 1],
        [1, 1, 1, 2, 1, 1, 1]
      ],
      [
        [1, 1, 1, 1, 1, 3, 1],
        [1, 5, 0, 0, 1, 4, 1],
        [1, 1, 1, 4, 0, 0, 1],
        [1, 6, 4, 0, 1, 0, 1],
        [1, 1, 1, 4, 1, 0, 1],
        [1, 6, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 2, 1]
      ]
    ];

    const length = mazes.length;

    return {
      mazes, length
    }
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

  generateClickedMaze() {
    const clicked: boolean[][] = [...Array(7)].map(e => Array(7));

    this.maze.forEach((line, i) => {
      line.forEach((cell, j) => {
        if (cell === CellType.entrance) {
          clicked[i][j] = true;
        } else {
          clicked[i][j] = false;
        }
      });
    });

    this.clickedMaze = clicked as ClickedMaze;
  }

  updateFog(i: number, j: number) {
    if (i < 0 || j < 0)
      return;

    this.clickedMaze[i][j] = true;

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

  isAdjacentToClicked(i: number, j: number): boolean {
    const left: coord = {i: i, j: j-1};
    const right: coord = {i: i, j: j+1};
    const up: coord = {i: i+1, j: j};
    const down: coord = {i: i-1, j: j};

    if (this.clickedMaze[left.i] && this.clickedMaze[left.i][left.j])
      return true;

    if (this.clickedMaze[right.i] && this.clickedMaze[right.i][right.j])
      return true;

    if (this.clickedMaze[up.i] && this.clickedMaze[up.i][up.j])
      return true;

    if (this.clickedMaze[down.i] && this.clickedMaze[down.i][down.j])
      return true;

    return false;
  }

  subtractLife() {
    this.lives.pop();

    if (this.lives.length === 0) {
      this.quiz.closeQuiz();
      this.end.end({
        outcome: 'lose',
        score: this.score
      });
    }
  }

  increaseScore(val: number, applyStreak?: boolean) {
    this.score += val;

    if (applyStreak)
      this.score += Math.ceil(val * this.streak * 0.1);

    if (this.score >= this.maxScore)
      this.startBoss();
  }

  private startBoss() {
    this.isBoss = true;
  }
}