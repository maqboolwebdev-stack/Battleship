import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderBoard } from './domController.js';

let player, computer;
let isGameOver = false;
let currentTurn = 'player'; // this variable will track whose turn it is

export function initGame() {
    player = new Player('real');
    computer = new Player('computer');
    isGameOver = false;
    currentTurn = 'player';

    const playerShip1 = new Ship(3);
    const playerShip2 = new Ship(2);
    player.gameBoard.placeShip(playerShip1, [0, 0], 'horizontal');
    player.gameBoard.placeShip(playerShip2, [2, 0], 'vertical');

    placeComputerShips();

    const statusDiv = document.getElementById('game-status');
    statusDiv.textContent = "Game Started! Your Turn.";

    setupEventListeners();
    refreshBoards();
}

function placeComputerShips() {
    const shipLengths = [5, 4, 3, 3, 2]; // Full Fleet

    shipLengths.forEach(length => {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

            const ship = new Ship(length);

            try {
                if (computer.gameBoard.canPlaceShip(ship, [row, col], direction)) {
                    computer.gameBoard.placeShip(ship, [row, col], direction);
                    placed = true;
                }
            } catch (e) {
                // Retry if invalid placement
            }
        }
    });
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
        currentTurn = 'player';
        statusDiv.textContent = "Your Turn! Click on Computer Board.";
    }

    refreshBoards();
}

function setupEventListeners() {
    const computerContainer = document.getElementById('computer-board');

    computerContainer.addEventListener('click', (e) => {
        if (isGameOver || currentTurn !== 'player') return;

        const cell = e.target.closest('.cell');
        if (!cell) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const coord = [row, col];

        const alreadyAttacked =
            computer.gameBoard.missedAttacks.some(m => m[0] === row && m[1] === col) ||
            computer.gameBoard.hitAttacks.some(h => h[0] === row && h[1] === col);

        if (alreadyAttacked) return;

        // Player attack on computer board
        computer.gameBoard.receiveAttack(coord);

        const statusDiv = document.getElementById('game-status');
        if (computer.gameBoard.reportAllSunk()) {
            isGameOver = true;
            statusDiv.textContent = "Congratulations! You Won!";
            refreshBoards();
            return;
        }

        // Turn switch to computer, player clicks are now blocked
        currentTurn = 'computer';
        statusDiv.textContent = "Computer's Turn...";
        refreshBoards();

        setTimeout(() => {
            computerPlay();
        }, 500);
    });
}
