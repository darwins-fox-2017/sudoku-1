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
        board_played[i].push(string[0])
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


  checkBox(arr = this.board()){
    var board_box_format = this.changetoBox(arr)
    for(var i = 0; i < 9 ;i++){
      var arr_box = board_box_format[i]
      for (var j = 0; j < 9; j++) {
        var temp_entry = arr_box[j]
        if(temp_entry != "0" && j != arr_box.indexOf(temp_entry)){
          if(arr_box.includes(temp_entry)){
            return false
          }
        }
      }
    }
    return true
  }

  solve(x = 0, y = 0, board = this.board()){

    // console.log(this.checkRow(board));
    // console.log(this.checkColumn(board));
    // console.log(this.checkBox(board));
    if(board[x][y] == '0'){
      board[x][y] = String(Number(board[x][y])+1)
      if(this.checkRow(board)){
        board[x][y] = String(Number(board[x][y])+1)
        y++
        if(y == 9){
          x++
          y = 0
          if(x == 9){
            return this.solve(x, y, board)
            // return board
          }
        }
      }
      else{
        board[x][y] = '0'
        return this.solve(x, y, board)
      }
    }else{
      y++
      if(y == 9){
        x++
        y = 0
        if(x == 9){
          return console.log(board)
          // return board
        }
      }
      return this.solve(x, y, board)

    }



  }


}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())
