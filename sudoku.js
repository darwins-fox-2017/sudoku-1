class Sudoku{
  constructor(string){
    this.initial_number = string
    this.board = this.boardMaker()
  }

  boardMaker(){// jangan di rubah
    var string = this.initial_number.split("")
    var board_played = []
    for(var i = 0; i < 9; i++){
      board_played[i] = []
      for(var j = 0; j < 9; j++){
        board_played[i].push(Number(string[0]))
        string.shift()
      }
    }
    return board_played
  }

  checkRow(row,val){
    return !this.board[row].includes(val)
  }

  checkColumn(column, val){
    for(let i=0; i<9; i++){
      if(this.board[i][column] == val){
        return false
      }
    }
    return true
  }


  checkBox(x,y,val){
    let index_x = Math.floor(x/3)*3
    let index_y = Math.floor(y/3)*3
    for(let x=index_x; x<=index_x+2; x++){
      for(let y=index_y; y<=index_y+2; y++){
        if(this.board[x][y] == val){
          return false
        }
      }
    }
    return true
  }

  solve(){
    let x = 0
    let y = 1
    let flag = false
    let temp = this.board
    // console.log(this.board);
    // while(!flag){
      if(this.board[x][y] === 0){
        let num = Math.floor(Math.random()*9)+1
        if(this.checkRow(x,num)){
          this.board[x][y] = num
          y++
          if(y == 9){
            y = 1
            x++
            if(x == 9){
              return this.board
            }
          }
        }
      }
      else{
        y++
        if(y == 9){
          y = 1
          x++
          if(x == 9){
            return this.board
          }
        }
      }
  }
}
// if(y<9){
//   y++
//   if(y == 9){
//     y = 1
//     x++
//     if(x == 9){
//       return "selesai"
//     }
//   }
// }


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game.board())
