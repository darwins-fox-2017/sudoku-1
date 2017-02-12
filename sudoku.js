"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = board_string.split("");
    this.number = [1,2,3,4,5,6,7,8,9]
    this.boardArr = []
  }

  print_board() {
    let index = 0;
    for (let i = 0; i < 9; i++) {
      this.boardArr.push([])
      for (let j = 0; j < 9; j++) {
        this.boardArr[i][j] = parseInt(this.board[index])
        index++
      }
    }
    return this
  }

  checkRow(row,val) {
    let check = this.boardArr[row].indexOf(val)
    if (check == -1) {
      return true
    }
    return false
  }

  checkColumn(column, val) {
    for (let i = 0; i < 9; i++) {
      if(this.boardArr[i][column] == val) {
        return false
      }
    }
    return true
  }

  //checkGroup(row,col,val)
  checkGroup(koorinatX, koorinatY, val) {
    let indexX = Math.floor(koorinatX / 3) * 3
    let indexY = Math.floor(koorinatY / 3) * 3
    console.log(`posisi index`);
    console.log(indexX);
    console.log(indexY);
    console.log("");

    for(let x = indexX; x <= indexX + 2; x++) {
      console.log(x);
      for(let y = indexY; y <= indexY + 2; y++) {
        console.log(`       ${y}`);
        if(this.boardArr[x][y] == val) {
          return false
        }
      }
    }
    return true
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
game.print_board();
console.log(game.boardArr);
// console.log(game.checkRow(0,1));       // row clear
// console.log(game.checkColumn(1,2));    // column clear
console.log(game.checkGroup(0,0,3));




// [ [ 1, 0, 5, 8, 0, 2, 0, 0, 0 ],
//   [ 0, 9, 0, 0, 7, 6, 4, 0, 5 ],
//   [ 2, 0, 0, 4, 0, 0, 8, 1, 9 ],
//   [ 0, 1, 9, 0, 0, 7, 3, 0, 6 ],
//   [ 7, 6, 2, 0, 8, 3, 0, 9, 0 ],
//   [ 0, 0, 0, 0, 6, 1, 0, 5, 0 ],
//   [ 0, 0, 7, 6, 0, 0, 0, 3, 0 ],
//   [ 4, 3, 0, 0, 2, 0, 5, 0, 1 ],
//   [ 6, 0, 0, 3, 0, 8, 9, 0, 0 ] ]

// group 1      group 2       group 3
// 1, 0, 5      8, 0, 2       0, 0, 0
// 0, 9, 0      0, 7, 6       4, 0, 5
// 2, 0, 0      4, 0, 0       8, 1, 9

// group 4      group 5       group 6
// 0, 1, 9      0, 0, 7       3, 0, 6
// 7, 6, 2      0, 8, 3       0, 9, 0
// 0, 0, 0      0, 6, 1       0, 5, 0

// group 7      group 8       group 9
// 0, 0, 7      6, 0, 0       0, 3, 0
// 4, 3, 0      0, 2, 0       5, 0, 1
// 6, 0, 0      3, 0, 8       9, 0, 0











// // Remember: this will just fill out what it can and not "guess"
// game.solve()
//
// console.log(game.board())
