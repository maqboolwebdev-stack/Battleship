import { Player } from "../modules/player.js";
import { GameBoard } from "../modules/gameBoard.js";

describe("Player Class", () => {
  test("creates a real player with a gameboard", () => {
    const player = new Player("real");

    expect(player.type).toBe("real");

    expect(player.gameBoard instanceof GameBoard).toBe(true);
  });

  test("creates a computer player with a gameboard", () => {
    const computer = new Player("computer");

    expect(computer.type).toBe("computer");
    expect(computer.gameBoard instanceof GameBoard).toBe(true);
  });
});
