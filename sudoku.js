"use strict"

class Sudoku {
  constructor(board_string) {
    this.initial_value = board_string
    this.board = this.generateBoard()
  }

  generateBoard(){
    let parse = this.initial_value.split('')
    let board = []
    for (let i = 0; i < 9; i++) {
      board[i] = []
      for (let j = 0; j < 9; j++) {
        board[i].push(Number(parse[0]))
        // parse.shift()
      }
    }
    console.log(board);
    return board
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())
