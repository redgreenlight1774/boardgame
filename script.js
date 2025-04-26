const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');
let cells = Array.from(document.getElementsByClassName('cell'));
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');
  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    statusDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (isDraw()) {
    statusDiv.textContent = "It's a draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
