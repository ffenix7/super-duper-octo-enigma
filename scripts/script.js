const cells = document.querySelectorAll("[data-cell]");
let isOTurn = false;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

const urlParams = new URLSearchParams(window.location.search);
let userSymbol = urlParams.get("symbol") || "x";

function end(w) {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
  alert(["You won!", "You lost...", "It's a draw."][w]); // sigma
}

function handleClick(e) {
  const cell = e.target;

  const currentClass = isOTurn ? "o" : "x";
  isOTurn = !isOTurn;

  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  let boardState = getCurrentBoardState(cells);

  let w = winner(boardState);

  if (w === userSymbol) end(0);
  else if (w !== "") end(1);

  if (actions().length == 0) end(2);
}

function getCurrentBoardState(cells) {
  // Returns current board state as list of chars
  return Array.from(cells, (cell) => cell.textContent.toLowerCase() || "");
}

function actions() {
  // Returns set of all possible actions (index) available on the board

  const possibleActions = [];

  cells.forEach((boardState, index) => {
    if (boardState.innerText == "") possibleActions.push(index);
  });

  return possibleActions;
}

function result(boardState, action) {
  //Returns the board that results from making move (index) on the board

  const newState = [...boardState];
  newState[action] = isOTurn ? "o" : "x";

  return newState;
}

function winner(boardState) {
  // rows
  for (let i = 0; i < 9; i+=3) {
    if (
      boardState[i] == boardState[i + 1] &&
      boardState[i + 1] == boardState[i + 2] &&
      boardState[i] != ""
    )
      return boardState[i];
  }

  // cols
  for (let i = 0; i < 3; i++) {
    if (
      boardState[i] == boardState[i + 3] &&
      boardState[i + 3] == boardState[i + 6] &&
      boardState[i] != ""
    )
      return boardState[i];
  }

  // diagonals
  if (
    boardState[0] == boardState[4] &&
    boardState[4] == boardState[8] &&
    boardState[0] != ""
  )
    return boardState[0];
  if (
    boardState[2] == boardState[4] &&
    boardState[4] == boardState[6] &&
    boardState[2] != ""
  )
    return boardState[2];

  return "";
}

function terminal(boardState) {
  // Returns true if game is over, false otherwise

  if (winner(boardState) == "") return false;
  return true;
}

function utility(boardState) {
  // Returns 1 if X has won the game, -1 if O has won, 0 otherwise

  let w = winner(boardState);

  if (w == "x") return 1;
  else if (w == "o") return -1;
  else return 0;
}
