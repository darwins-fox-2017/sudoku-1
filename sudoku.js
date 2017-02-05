"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.unsolvedBoard = []
    this.convertUnsolvedString()
    this.legalNum
    this.tes = []
  }

  convertUnsolvedString() {
    if(this.board_string !== '') {
      let start = 0
      for (let i = 0; i < 9; i++) {
        this.unsolvedBoard[i] = []
        for (var j = 0; j < 9; j++) {
          this.unsolvedBoard[i][j] = this.board_string[start+j]
        }
        start = j*(i+1)
      }
    }
  }

  numExistRow(row, compValue) {
    for (let i = 0; i < this.unsolvedBoard[row].length; i++) {
      if (this.unsolvedBoard[row][i] == compValue) {
        return true
      }
    }
    return false
  }

  numExistCol(col, compValue) {
    for (let i = 0; i < 9; i++) {
      if (this.unsolvedBoard[i][col] == compValue) {
        return true
      }
    }
  }

  numExistX3square(row, col, compValue) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3 ; j++) {
        if ((row < (i*3) && row >= (i*3)-3) &&  (col < (j*3) && col >= (j*3)-3)) {
          let startRow = (i*3)-3
          let endRow = i*3
          let startCol = (j*3)-3
          let endCol = j*3
          return this.searchExistInSquare(startRow, endRow, startCol, endCol, compValue)
        }
      }
    }
    return false
  }

  searchExistInSquare(startRow, endRow, startCol, endCol, compValue) {
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        if (compValue == this.unsolvedBoard[i][j]) {
          return true
        }
      }
    }
    return false
  }

  isEmpty(row, col) {
    return this.unsolvedBoard[row][col] == 0
  }

  isSafe(row, col, num) {
    if (!this.numExistRow(row, num) && !this.numExistCol(col, num) && !this.numExistX3square(row, col, num)) {
      return true
    }
    return false
  }

  checkEmptyRow(row) {
    for (var i = 0; i < this.unsolvedBoard.length; i++) {
      return this.unsolvedBoard[row][i] == 0 
    }
  }

  getNextField(row, col) {
    col++ 

    if (col>8) {
      col=0 
      row++
    }

    if (row>8) {
      return null
    }
    return this.solve(row, col)
  }

  solve(row=0, col=0) {
    console.log(this.unsolvedBoard)
    if (row > 8 && col > 8) {
      // console.log('tes');
      return true
    }

    if (this.unsolvedBoard[row][col] != 0) {
      return this.solve(this.getNextField(row, col)) 
    }

    for (let i = 1; i <= 9; i++) {
      if (!this.isSafe(row, col, i)) {
        continue;
      }

      this.unsolvedBoard[row][col] = i.toString()


      if (this.solve(this.getNextField(row, col))) {
        return true
      } else {
        let zero = 0 
        this.unsolvedBoard[row][col] = zero.toString()
      } 
    }

    return false
  }

  // solve(row=0, col=0, num=1) {
  //   // for (let i = row; i < this.unsolvedBoard.length; i++) {
  //     // console.log(this.unsolvedBoard)
  //     while (row<9) {
  //       for (let j = col; j < this.unsolvedBoard[row].length; j++) {
  //         // this.tes.push(j)
  //             console.log(this.unsolvedBoard);
  //         if (this.isEmpty(row,j)) {
  //           if (this.isSafe(row,j,num)) {
  //             this.unsolvedBoard[row][j] = num.toString()
  //           } else if(!this.isSafe(row,j,num)) {
  //             let nextAttempt = (num%9)+1
  //             console.log(nextAttempt);
  //             return this.solve(row, j, nextAttempt)
  //           }
  //         }
  //       }
  //       return this.solve(row+1, 0, 1)
  //     }
      
  //   // }
  // }

  // Returns a string representing the current state of the board
  board() {
    console.log(this.tes);
    return this.unsolvedBoard
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function erase() {
    console.log("\x1B[2J")
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

console.log(game.board())

// console.log(game.unsolvedBoard[9][9])
// console.log(game.isEmpty(0, 1))
