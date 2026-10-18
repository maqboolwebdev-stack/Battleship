import { Ship } from "../modules/ship.js";

describe("Ship Class", () => {
  test("creates a ship with the given length and 0 hits", () => {
    const myShip = new Ship(3);

    expect(myShip.length).toBe(3);
    expect(myShip.hits).toBe(0);
    expect(myShip.isSunk()).toBe(false);
  });

  test("should increment hits with hit()", () => {
    const myShip = new Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
  });

  test("should be sunk if hits reach length", () => {
    const myShip = new Ship(2);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
});
