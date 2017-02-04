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
    let temp = this.board
    let flag = true
    let tempXY = [] // tempat merekam indeks yang dikunjungi beserta nilai yang diassign
    console.log(temp) // papan awal
    let num = 1

    while(x<9 || y<9){
      if(this.board[x][y] === 0){

        if(this.checkBox(x,y,num) && this.checkRow(x,num) && this.checkColumn(y,num) && flag){
          console.log(this.board) // proses pengisian
          flag =true
          tempXY.push({'x' : x, 'y': y, 'nilai': num})
          this.board[x][y] = num // assign jadi num (kondisi nya semua terpenuhi)
          num = 1 // pindah ke kotak selanjutnya dgn reset num jadi 1
          y++
          if(y == 9){
            y = 0
            x++
            if(x == 9){
              return this.board
            }
          }
        }else{
          if(num<9){
            num++// kalau angka g sesuai di kotak, tambah dan ulangi ke atas
          }
          else{//artinya semua angka g cocok , balik ke koordinat yg diisi sebelumnya
            x = tempXY[tempXY.length-1].x
            y = tempXY[tempXY.length-1].y
            num = tempXY[tempXY.length-1].nilai + 1
            if(num > 9){
              flag = false // angka kotak sebelumnya juga 9, balik ke kotak sebelumnya
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
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')//('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[13]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game.board())
