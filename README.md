# Tic-Tac-Toe AI 

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JS">

<br>

Tic-Tac-Toe AI is a simple bot, that plays the classic game of tic-tac-toe with the user.

## How it works:

The program uses a [minimax algorithm](https://en.wikipedia.org/wiki/Minimax#Minimax_algorithm_with_alternate_moves) to evaluate each position as the game progresses, to choose the most optimal move.

Our implementation **does not** include [alfa-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning), to make each game more unique _(alpha-beta pruning would result in each game being the same, while not using it allows us to add a touch of randomness)_.

## How to test it:

Start by dowloading the repository:

```bash
git clone https://github.com/ffenix7/super-duper-octo-enigma
```

Then go into the dowloaded directory and open the [`index.html`](./index.html) file with a browser of your choice.

After clicking the start button and chosing your symbol, you will be able to face the bot.

> [!NOTE]
> **`X` always starts!**