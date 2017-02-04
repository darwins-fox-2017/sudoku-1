class Sudoku{
  constructor(string){
    this.initial_number = string
    this.board = this.boardMaker()
  }

  boardMaker(){
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
    let y = 0
    let flag = true
    let tempXY = []
    let num = 1

    while(x<9 || y<9){
      if(this.board[x][y] === 0){

        if(this.checkBox(x,y,num) && this.checkRow(x,num) && this.checkColumn(y,num) && flag){
          flag =true
          tempXY.push({'x' : x, 'y': y, 'nilai': num})
          this.board[x][y] = num
          num = 1
        }else{
          if(num<9){
            num++
          }
          else{
            x = tempXY[tempXY.length-1].x
            y = tempXY[tempXY.length-1].y
            num = tempXY[tempXY.length-1].nilai + 1
            if(num > 9){
              flag = false
            }else{
              flag = true
            }
            tempXY.pop()
            this.board[x][y] = 0
          }

        }
      }
      else{
        flag = true
        y++
        if(y == 9){
          y = 0
          x++
          if(x == 9){
            return this.board
          }
        }
      }
    }
  }
}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[13]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

console.log(game.boardMaker())
