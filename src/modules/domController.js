import { SHIP_COLORS } from './ship-colors.js';

export function renderBoard(
  gameBoardInstance,
  container,
  isEnemy = false,
  isGameOver = false,
) {
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(10, 35px)";
  container.style.gridTemplateRows = "repeat(10, 35px)";
  container.style.gap = "2px";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.style.width = "35px";
      cell.style.height = "35px";
      cell.style.backgroundColor = "#e0e0e0";
      cell.style.border = "1px solid #ccc";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.cursor = isEnemy && !isGameOver ? "pointer" : "default";

      const coord = [row, col];
      const ship = gameBoardInstance.getShipAt(coord);
      const isMiss = gameBoardInstance.missedAttacks.some(
        (m) => m[0] === row && m[1] === col,
      );
      const isHit =
        gameBoardInstance.hitAttacks &&
        gameBoardInstance.hitAttacks.some((h) => h[0] === row && h[1] === col);

      // Miss attack visual
      if (isMiss) {
        cell.style.backgroundColor = "#e6c2c2";
        cell.textContent = "❌";
        cell.style.color = "#ce0000";
      }

      // Hit attack visual
      if (isHit) {
        cell.style.backgroundColor = "#ede4bc";
        cell.textContent = "💥";
      }

      if (ship && !isEnemy && !isHit) {
        cell.style.backgroundColor = SHIP_COLORS[ship.length] ||"#8fbc8f";
      }

      container.appendChild(cell);
    }
  }
}
