"use strict"

class Sudoku {
  constructor(string) {
    this.arrBoard = string
    this.board = this.boardMaker()
  }

  boardMaker() {
    let string = this.arrBoard.split("")
    let arrBoard = []
    for(let rows = 0; rows <= 8 ; rows++){
      arrBoard[rows] = []
      for(let cols = 0; cols <= 8; cols++){
        arrBoard[rows].push(Number(string[0]))
        string.shift()
      }
    }
    return arrBoard
  }

  checkRows(row, value){
    return !this.board[row].includes(value)
  }

  checkCols(col, value){
    for(let i = 0; i < 9; i++){
      if (this.board[i][col] == value) {
        return false
      }
    }
    return true
  }

  checkBox(rows, cols, value){
    let boxSize   = 3,
        rowIndex  = Math.floor(rows/boxSize) * boxSize,
        colsIndex = Math.floor(cols/boxSize) * boxSize

    for (let i = rowIndex; i <= rowIndex + 2; i++){
      for (let j = colsIndex; j <= colsIndex + 2; j++) {
        if (this.board[i][j] == value) {
          return false
        }
      }
    }
    return true
  }

  solve(){}

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.boardMaker())
console.log(`===============Solve=============`);
console.log(game.checkRows(0,3));
console.log(game.checkCols(0,5));
console.log(game.checkBox(0,1,2));
// console.log(game.solve());
