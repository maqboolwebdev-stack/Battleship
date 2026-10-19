import { GameBoard } from "./gameBoard.js";

export class Player {
  constructor(type = "real") {
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}
