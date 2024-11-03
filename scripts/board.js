const board_cells = document.querySelectorAll('.cell');
const board_cells_data = [];

let cells_left = 9;

const urlParams = new URLSearchParams(window.location.search);
const player_symbol = urlParams.get('symbol');

board_cells.forEach((cell) => {
    cell.addEventListener('click', onCellClick);
    board_cells_data.push(cell.innerText);
});

function place(cell_id, symbol) {
    let cell = board_cells[cell_id];

    cell.classList.add(symbol);
    cell.innerText = symbol.toUpperCase();
    cell.removeEventListener('click', onCellClick);

    --cells_left;

    let state = check_board_state();

    if(state == '')
        return state;

    board_cells.forEach((cell) => {
        cell.removeEventListener('click', onCellClick);
    });

    return state;
}

function check_board_state() {
    // rows
    for(let y=0; y<9; y+=3) {
        if(board_cells_data[y] != '' && board_cells_data[y] == board_cells_data[y+1] && board_cells_data[y] == board_cells_data[y+2]) 
            return board_cells_data[y];
    }

    // cols
    for(let x=0; x<3; x++) {
        if(board_cells_data[x] != '' && board_cells_data[x] == board_cells_data[x+3] && board_cells_data[x] == board_cells_data[x+6]) 
            return board_cells_data[x];
    }

    // diagonals
    if(board_cells_data[0] != '' && board_cells_data[0] == board_cells_data[4] && board_cells_data[0] == board_cells_data[8]) 
        return board_cells_data[0];

    if(board_cells_data[2] != '' && board_cells_data[2] == board_cells_data[4] && board_cells_data[2] == board_cells_data[6])
        return board_cells_data[2];

    return '';
}

if(player_symbol != 'x')
    bot();

function onCellClick(event) {
    let c = place(parseInt(this.id.slice(-1)), player_symbol);

    if(c != '' || cells_left == 0)
    {
        end(cells_left == 0 ? 'd' : c);
        return;
    }

    bot();
}

function end(winner) {
    window.location.href = `./end.html?winner=${winner}`;
}