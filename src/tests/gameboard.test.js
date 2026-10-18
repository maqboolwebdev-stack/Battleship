import { Ship } from "../modules/ship";
import { GameBoard } from "../modules/gameBoard";

describe("GameBoard Class", () => {
  test("places a ship at specific coordinates", () => {
    const board = new GameBoard();
    const ship = new Ship(3);

    board.placeShip(ship, [0, 0], "horizontal");

    expect(board.getShipAt([0, 0])).toBe(ship);
    expect(board.getShipAt([0, 1])).toBe(ship);
    expect(board.getShipAt([0, 2])).toBe(ship);
  });

  test("records a hit when attack hits a ship", () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");

    board.receiveAttack([0, 1]);
    expect(ship.hits).toBe(1);
  });

  test("records missed attacks", () => {
    const board = new GameBoard();

    board.receiveAttack([5, 5]);
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test("reports whether all ships are sunk", () => {
    const board = new GameBoard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    board.placeShip(ship1, [0, 0], "horizontal");
    board.placeShip(ship2, [2, 2], "horizontal");

    expect(board.reportAllSunk()).toBe(false);

    board.receiveAttack([0, 0]);
    board.receiveAttack([2, 2]);

    expect(board.reportAllSunk()).toBe(true);
  });
});
