export class GameBoard {
  constructor() {
    this.grid = new Map();
    this.missedAttacks = [];
    this.hitAttacks = []; // this array will track successful attack
    this.ships = [];
  }

  placeShip(ship, startCoord, direction = "horizontal") {
    const [row, col] = startCoord;

    if (!this.ships.includes(ship)) {
      this.ships.push(ship);
    }

    for (let i = 0; i < ship.length; i++) {
      let r = row;
      let c = col;

      if (direction === "horizontal") {
        c += i;
      } else {
        r += i;
      }

      const key = `${r},${c}`;
      this.grid.set(key, ship);
    }
  }

  getShipAt(coord) {
    const [row, col] = coord;
    const key = `${row},${col}`;
    return this.grid.get(key) || null;
  }

  receiveAttack(coord) {
    const ship = this.getShipAt(coord);

    if (ship) {
      ship.hit();
      this.hitAttacks.push(coord)
    } else {
      this.missedAttacks.push(coord);
    }
  }

  reportAllSunk() {
    if (this.ships.length === 0) {
      return false;
    }

    return this.ships.every((ship) => ship.isSunk());
  }
}
