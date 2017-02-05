"use strict"

class Sudoku {
  constructor(boardString) {
    this.boardString=boardString;
    this.boardArr9x9=this.boardStringtoArr(this.boardString);
    this.boardNew9x9;
  }

  solve() {
    console.log(this.boardArr9x9);
    console.log('-------------------------------');
    let iterasi=0
    do {
      iterasi++;
  this.boardArr9x9=this.boardStringtoArr(this.boardString);
   //console.log(this.boardArr9x9);
    //console.log('-------------------------------',iterasi);
      var outputBoard=this.solvingBoardOneIteration(this.boardArr9x9);
      //console.log(outputBoard);
      //console.log('---------------');
      var testboard=this.testBoard(outputBoard);
   } while (testboard&&iterasi<100000);
this.boardNew9x9=outputBoard;
 }

  //solving board for one iteration
  solvingBoardOneIteration(boardArr9x9){
    //search empety possition
    let empetyPosition=this.findEmpetyPossition(boardArr9x9);
    let outputboard=boardArr9x9;
    //console.log(empetyPosition);
    //repeat asmuch as empety possition
    for (let i = 0; i < empetyPosition.length;i++) {
      let line=empetyPosition[i][0];
      let coll=empetyPosition[i][1];
      //console.log(line,coll);
      //colect number that availibel
      let availValue=[];
      for (let value = 1; value < 10; value++) {
        if (!this.checkNumber(boardArr9x9, line, coll, value)) {
          availValue.push(value);
        }
      }
      let inputValue=this.getNumberFromAvailNumber(availValue);
      //console.log(line,coll,availValue,inputValue);
      outputboard[line][coll]=''+inputValue;
    }

    return outputboard;
  }

  //test board if there still zero
  testBoard (boardArr9x9){
      for (let i = 0; i < boardArr9x9.length; i++) {
        for (let j = 0; j < boardArr9x9[0].length; j++) {
          if (boardArr9x9[i][j]==0){
            return true
          }
        }
      }
      return false;
  }
  // Returns a string representing the current state of the board
  board() {
    console.log(this.boardNew9x9);
  }

  //confert string to array 9x9
  boardStringtoArr(boardString){
    let outputBoard=[]
    let boardArrLine=boardString.split('');
    for (let i = 0; i < 9; i++) {
      let fileColl=[];
      for (let j = 0; j < 9; j++) {
        fileColl.push(boardArrLine[0])
        boardArrLine.shift();
      }
      outputBoard.push(fileColl);
    }
    return outputBoard;
  }

  //find possition of empety
  findEmpetyPossition(boardArr9x9){
    let empetyPos=[];
    for (var line = 0; line < boardArr9x9.length; line++) {
      for (var coll = 0; coll < boardArr9x9[0].length; coll++) {
        if (boardArr9x9[line][coll]==0) {
          empetyPos.push([line,coll]);
        }
      }
    }
    return empetyPos;
  }

  //check line
  checkLine(board,line,value){
    for (var i = 0; i < board[line].length; i++) {
      if (board[line][i]==value) {
        //jika ditemukan yang sama dalam satu baris akan mereturn true
        return true
      }
    }
    //jika tidak return false
    return false
  }

  //check coll
  checkColl(board,coll,value){
    for (var i = 0; i < board.length; i++) {
      if (board[i][coll]==value) {
        //jika ditemukan yang sama dalam satu baris akan mereturn true
        return true;
      }
    }
    return false;
  }

  //check in boc 3x3
  check3x3(board,line,coll,value){
    let collCorner=0;
    let lineCorner=0;
    let boxSize=3;
    let result=false
    //define corner
    while (coll>=collCorner+boxSize) {
      collCorner+=boxSize;
    }
    while (line>=lineCorner+boxSize) {
      lineCorner+=boxSize;
    }
    for (let i =lineCorner; i < lineCorner+boxSize; i++) {
      for (let j = collCorner; j < collCorner+boxSize; j++) {
        if (board[i][j]==value) {
          return true
        }
      }
    }
    return false;
  }

  //union check coll, check line, and check 3x3
  checkNumber(board,line,coll,value){
    if (this.checkLine(board,line,value)||this.checkColl(board,coll,value)||this.check3x3(board,line,coll,value)) {
      return true
    }else {
      return false
    }
  }

  getNumberFromAvailNumber(availNumber){
    if (availNumber.length==0) {
      return 0;
    }else {
      let IndexFloat=(Math.random()*(availNumber.length-1))
      if (IndexFloat%1>=0.5) {
        let availNumberIndex=Math.ceil(IndexFloat);
        return availNumber[availNumberIndex];
      }else {
        let availNumberIndex=Math.floor(IndexFloat);
        return availNumber[availNumberIndex];
      }

    }

  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
/*var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]*/

//let board_string='290167308310480620678053091056312079083504210721698534062941083809026140107805062'
//let board_string='105802000090076405200400819019007306762083090000061050007600030430020501600308900'
//let board_string='005030081902850060600004050007402830349760005008300490150087002090000600026049503'
//let board_string='005080700700204005320000084060105040008000500070803010450000091600508007003010600'
let board_string='004100308010000620008200400000302809000070000701608000562001703030000040100005000'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve();
game.board();
console.log('there still zero in the board? ',game.testBoard(game.boardNew9x9));



//console.log(game.testBoard(game.boardNew9x9));
//console.log(game.testBoard(game.boardArr9x9));
//console.log(game.getNumberFromAvailNumber([1,2]));
/*console.log(game.checkColl(game.boardArr9x9,1,2));
console.log(game.checkLine(game.boardArr9x9,0,2));
console.log(game.check3x3(game.boardArr9x9,4,4,7));
console.log(game.checkNumber(game.boardArr9x9,4,4,7));*/
