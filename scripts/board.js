const board_cells = document.querySelectorAll('.cell');
const board_cells_data = [];

const urlParams = new URLSearchParams(window.location.search);
const player_symbol = urlParams.get('symbol');

const other_symbol = (player_symbol == 'x' ? 'o' : 'x');

board_cells.forEach((cell) => {
    cell.addEventListener('click', onCellClick);
    board_cells_data.push(cell.innerText);
});

const cells_left = get_cells_left(board_cells_data);

function get_cells_left(board) {
    const cells = [];
    for(let i=0; i<9; i++) {
        if(board[i] == '')
            cells.push(i);
    }
    return cells;
}

function place(cell_id, symbol) {
    const cell = board_cells[cell_id];

    cell.classList.add(symbol);
    cell.innerText = symbol.toUpperCase();
    cell.removeEventListener('click', onCellClick);

    cells_left.splice(cells_left.indexOf(cell_id), 1);
    board_cells_data[cell_id] = symbol;

    const state = check_board_state(board_cells_data);

    if(state == '')
        return state;

    board_cells.forEach((cell) => {
        cell.removeEventListener('click', onCellClick);
    });

    if(state != '' || cells_left.length == 0)
    {
        end(cells_left.length == 0 ? 'd' : state);
        return;
    }
}

function check_board_state(board) {
    // rows
    for(let y=0; y<9; y+=3) {
        if(board[y] != '' && board[y] == board[y+1] && board[y] == board[y+2]) 
            return board[y];
    }

    // cols
    for(let x=0; x<3; x++) {
        if(board[x] != '' && board[x] == board[x+3] && board[x] == board[x+6]) 
            return board[x];
    }

    // diagonals
    if(board[0] != '' && board[0] == board[4] && board[0] == board[8]) 
        return board[0];

    if(board[2] != '' && board[2] == board[4] && board[2] == board[6])
        return board[2];

    return '';
}

if(player_symbol != 'x')
    bot();

function onCellClick(event) {
    place(parseInt(this.id.slice(-1)), player_symbol);

    bot();
}

function end(winner) {
    window.location.href = `./end.html?winner=${winner}`;
}

function evaluate(board, cell_id, symbol) {
    new_board = [...board];
    new_board[cell_id] = symbol;

    const state = check_board_state(new_board);

    if(state == symbol)
        return 1;
    else if(state != '')
        return -1;

    const cells = get_cells_left(new_board);
    if(cells.length == 0)
        return 0;

    const other_symbol = (symbol == 'x' ? 'o' : 'x');

    let best_val = -Infinity;

    cells.forEach((option) => {
        best_val = Math.max(evaluate(new_board, option, other_symbol), best_val);

        // can't be better - might as well break out early
        if(best_val == 1)
            return -1;
    });

    return -best_val;
}

function bot() {
    let best_option = undefined;
    let best_val = -Infinity;

    cells_left.forEach((option) => {
        const evaluation = evaluate(board_cells_data, option, other_symbol);
        
        if(evaluation > best_val) {
            best_val = evaluation;
            best_option = option;
        }
    });

    console.log('best_option', best_option, '\ncells_left', cells_left);

    place(best_option, other_symbol);
}