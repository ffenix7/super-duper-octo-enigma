//Helou! If you wish your bot, to not play randomly, but to use alfa-beta pruning make sure that alfa-beta pruning is turned ON
let alfa_beta = false;

const board_cells = document.querySelectorAll('.cell');
const board_cells_data = [];

const url_params = new URLSearchParams(window.location.search);
const _player_symbol = url_params.get('symbol');

const player_symbol = (_player_symbol != 'o' && _player_symbol != 'x') ? 'x' : _player_symbol

const other_symbol = (player_symbol == 'x' ? 'o' : 'x');

board_cells.forEach(cell => {
	cell.addEventListener('click', onCellClick);
	board_cells_data.push(cell.innerText);
});

const cells_left = get_cells_left(board_cells_data);

function get_cells_left(board) {
	const cells = [];
	for (let i=0; i<9; i++) {
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

	const [state, cells_ids] = check_board_state(board_cells_data);

	if(state != '' || cells_left.length == 0)
	{
		cells_ids.forEach(c => {
			board_cells[c].classList.add('highlight')
		})

		board_cells.forEach(c => {
			c.removeEventListener('click', onCellClick);
		});

		end(state == '' ? 'd' : (state == player_symbol ? 'p' : 'b'));
		return false;
	}

	return true;
}

function check_board_state(board) {
	// rows
	for(let y=0; y<9; y+=3) {
		if(board[y] != '' && board[y] == board[y+1] && board[y] == board[y+2]) 
			return [board[y], [y, y+1, y+2]];
	}

	// cols
	for(let x=0; x<3; x++) {
		if(board[x] != '' && board[x] == board[x+3] && board[x] == board[x+6]) 
			return [board[x], [x, x+3, x+6]];
	}

	// diagonals
	if(board[0] != '' && board[0] == board[4] && board[0] == board[8]) 
		return [board[0], [0, 4, 8]];

	if(board[2] != '' && board[2] == board[4] && board[2] == board[6])
		return [board[2], [2, 4, 6]];

	return ['',[]];
}

function onCellClick(event) {
	if (place(parseInt(this.id.slice(-1)), player_symbol))
		bot();
}

const footer = document.querySelector('footer');

const results = ["You won!","It's a draw.", "You lost..."];
const ids = { 'p': 0, 'd': 1, 'b': 2 };

function end(winner) {
	res.innerText = `${results[ids[winner]]}`;

	footer.style.transition = '2s';

	footer.classList.remove('scale');
}

const memo = {}

function evaluate(board, cell_id, symbol, depth) {
	const new_board = [...board];
	new_board[cell_id] = symbol;

	const board_symbol = new_board.join(':')
	if(board_symbol in new_board)
		return memo[board_symbol];

	const [state, _] = check_board_state(new_board);

	if(state == player_symbol)	return (-10 + depth);
	else if(state != '')		return ( 10 - depth);

	const cells = get_cells_left(new_board);
	if(cells.length == 0)		return 0;

	const is_player = (symbol == player_symbol);
	const other_symbol = (symbol == 'x' ? 'o' : 'x');

	let best_val = (is_player ? -Infinity : Infinity);
	const eval_func = (is_player ? Math.max : Math.min);

	cells.forEach(option => {
		best_val = eval_func(evaluate(new_board, option, other_symbol, depth + 1), best_val);
	});

	memo[board_symbol] = best_val;
	return best_val;
}

function bot() {
	let best_option = undefined;
	let best_val = -Infinity;

	cells_left.forEach(option => {
		const evaluation = evaluate(board_cells_data, option, other_symbol, 0);
		if(alfa_beta){
			if(evaluation > best_val) {
				best_val = evaluation;
				best_option = option;
			}
		}
		else if(evaluation > best_val || (evaluation == best_val && Math.random() < .5)) {
			best_val = evaluation;
			best_option = option;
		}
	});

	place(best_option, other_symbol);
}

if(player_symbol != 'x')
	bot();