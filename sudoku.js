class Sudoku{
  constructor(string){
    this.initial_number = string
  }

  board(){// jangan di rubah
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

  checkRow(arr = this.board()){
    var board_row_format = arr
    for(var i = 0; i < 9 ;i++){
      var arr_row = board_row_format[i]
      for (var j = 0; j < 9; j++) {
        var temp_entry = arr_row[j]
        if(temp_entry != "0" && j != arr_row.indexOf(temp_entry)){
          if(arr_row.includes(temp_entry)){
            return false
          }
        }
      }
    }
    return true
  }

  changetoColumn(arr){
    var board_col_format = []
    var board = arr
    for(var i = 0; i < 9; i++){
      board_col_format.push([])
    }
    for(i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        board_col_format[j].push(board[i][j])
      }
    }
    return board_col_format
  }

  checkColumn(arr){
    var board_col_format = this.changetoColumn(arr)
    for(var i = 0; i < 9 ;i++){
      var arr_col = board_col_format[i]
      for (var j = 0; j < 9; j++) {
        var temp_entry = arr_col[j]
        if(temp_entry != "0" && j != arr_col.indexOf(temp_entry)){
          if(arr_col.includes(temp_entry)){
            return false
          }
        }
      }
    }
    return true
  }

  changetoBox(arr){
    var board_box_format = []
    var board = arr
    for(var i=0; i < 9; i++){
      board_box_format.push([])
    }

    for(var j = 0; j < 9; j++){
      var dumIndex1 = 0
      var dumIndex2 = 0
      var dumIndex3 = 0

      if(j%3 === 0){// box 0,3,6
        for(var k=0; k<3; k++){
          for(var l=dumIndex1; l<dumIndex1+3; l++){
            board_box_format[j].push(board[k][l])
          }
        }
        dumIndex1 = dumIndex1+3
      }else if(j%3 === 1){ // box 1,4,7
        for(var k=3; k<6; k++){
          for(var l=dumIndex2; l<dumIndex2+3; l++){
            board_box_format[j].push(board[k][l])
          }
        }
        dumIndex2 = dumIndex2+3
      }else {
        for(var k=6; k<9; k++){ // box 2,5,8
          for(var l=dumIndex3; l<dumIndex3+3; l++){
            board_box_format[j].push(board[k][l])
          }
        }
        dumIndex3 = dumIndex3+3
      }
    }
    return board_box_format
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
