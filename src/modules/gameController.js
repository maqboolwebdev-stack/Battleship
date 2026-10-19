import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderBoard } from './domController.js';

let player, computer;
let isGameOver = false;

export function initGame() {
    player = new Player('real');
    computer = new Player('computer');

    const playerShip = new Ship(3);
    const computerShip = new Ship(3);

    player.gameBoard.placeShip(playerShip, [4, 0], 'horizontal');
    computer.gameBoard.placeShip(computerShip, [5, 0], 'vertical');

    const statusDiv = document.getElementById('game-status');
    statusDiv.textContent = "Game Started! Your Turn.";

    setupEventListeners();
    refreshBoards();
}

function refreshBoards() {
    renderBoard(player.gameBoard, document.getElementById('player-board'), false, isGameOver);
    renderBoard(computer.gameBoard, document.getElementById('computer-board'), true, isGameOver);
}

function computerPlay() {
    if (isGameOver) return;

    let row, col;
    do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
    } while (
        player.gameBoard.missedAttacks.some(m => m[0] === row && m[1] === col) ||
        player.gameBoard.hitAttacks.some(h => h[0] === row && h[1] === col)
    );

    player.gameBoard.receiveAttack([row, col]);

    const statusDiv = document.getElementById('game-status');
    if (player.gameBoard.reportAllSunk()) {
        isGameOver = true;
        statusDiv.textContent = "Game Over! Computer Won!";
    } else {
        statusDiv.textContent = "Your Turn! Click on Computer Board.";
    }

    refreshBoards();
}

function setupEventListeners() {
    const computerContainer = document.getElementById('computer-board');

    computerContainer.addEventListener('click', (e) => {
        if (isGameOver) return;

        const cell = e.target.closest('.cell');
        if (!cell) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const coord = [row, col];

        const alreadyAttacked =
            computer.gameBoard.missedAttacks.some(m => m[0] === row && m[1] === col) ||
            computer.gameBoard.hitAttacks.some(h => h[0] === row && h[1] === col);

        if (alreadyAttacked) return;

        computer.gameBoard.receiveAttack(coord);

        const statusDiv = document.getElementById('game-status');
        if (computer.gameBoard.reportAllSunk()) {
            isGameOver = true;
            statusDiv.textContent = "Congratulations! You Won!";
            refreshBoards();
            return;
        }

        statusDiv.textContent = "Computer's Turn...";
        refreshBoards();

        setTimeout(() => {
            computerPlay();
        }, 500);
    });
}
