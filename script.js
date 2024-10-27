const cells = document.querySelectorAll('[data-cell]');
let isOTurn = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = isOTurn ? 'o' : 'x';
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
  isOTurn = !isOTurn;
}

function player(cells){
    //Returns which player's turn it is.
    
    
}