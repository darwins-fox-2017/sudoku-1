"use strict"

class Sudoku {
  constructor() {
    this.board_string = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';
    this.sudokuBoard = [];
  }

  solve() {
    for (var i = 0; i < 9; i++) {

    }
  }

  // Returns a string representing the current state of the board
  board() {
    for (var i = 0; i < 9; i++) {
      let arr = []

      for (var j = 0; j < 9; j++) {
        arr.push(this.board_string.slice(0,1))
        this.board_string = this.board_string.slice(1)

      }
      this.sudokuBoard.push(arr)
    }
    console.log('print board')
    return this.sudokuBoard
  }

  cekBaris() {
    console.log("cek baris");
    for (var i = 0;i < 9; i++) {
      for (var j = 0; j < 9;j++) {
        if (this.sudokuBoard[i][j] == 0) {
          this.sudokuBoard[i][j] = "nol"
        }

      }
      // console.log(this.sudokuBoard);
    }
    return this.sudokuBoard
  }

  cekKolom(y,val) {

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku()

// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log(game.board())
console.log(game.cekBaris())
