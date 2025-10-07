"use strict";
const Gameboard = (function(){
    // private
    const size = 3;
    const board = [];

    // create a 2d array that will represent the game board
    for (let i = 0; i < size; i++){
                    board[i] = [];
        for(let j = 0; j < size; j++){
            board[i].push('');

}}
    const getBoard = () => board;



    const placeMark = (row, coll, mark) => {
              board[row][coll] = mark;
        }
      
    

    const printBoard = () =>{
        console.log(getBoard());
    }

    const resetBoard = () => {
        // this modifies the exisiting array structure instead of rebuilding it
        for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            board[i][j] = '';

        }}
    }


return {getBoard, placeMark, resetBoard  }
}
)();    




const Player = function(name, token){
    return {name,
        token}
};

const gameController = (function () {
    const firstUserName = prompt('Enter the name of the first player');
    const secondUserName = prompt('Enter the name of the second player');
    const playerOne = Player(firstUserName, 'X');
    const playerTwo = Player(secondUserName, 'O');
    const players = [
        playerOne ,
        playerTwo
    ]

    let turnCounter = 1;

    let activePlayer = players[0];

    const switchPlayerTurn = ()=>{
        activePlayer= activePlayer === players[0] ? players[1] : players[0];
    }

    // wining conditions
    const  checkRowWin = ()=> {
        let boardState = Gameboard.getBoard();
        const dimensions = 3;

        for (let i = 0; i < dimensions ; i ++){
            let playerOneCounter = 0;
            let playerTwoCounter = 0;
            for (let j = 0; j < dimensions; j++){
                cell = boardState[i][j];
                if(cell ===  players[0].token){
                    playerOneCounter++;
                    playerTwoCounter = 0;
                    }
              else if(cell === players[1].token){
                playerOneCounter =0;
                playerTwoCounter++;
            }
            else {
                playerOneCounter = 0;
                playerTwoCounter = 0;
            }
            }
            if (playerOneCounter === 3 || playerTwoCounter === 3) {
                console.log(`${activePlayer.name} has won the game on a row!`);
                return true;
            }

         }
         return false;
    }

    const checkColumnWin = () => {
         let boardState = Gameboard.getBoard();
        const dimensions = 3;

        for (let i = 0; i < dimensions ; i ++){
            let playerOneCounter = 0;
            let playerTwoCounter = 0;
            for (let j = 0; j < dimensions; j++){
                cell = boardState[j][i];
                if(cell ===  players[0].token){
                    playerOneCounter++;
                    playerTwoCounter = 0;
                    }
              else if(cell === players[1].token){
                playerOneCounter =0;
                playerTwoCounter++;
            }
            else {
                playerOneCounter = 0;
                playerTwoCounter = 0;
            }
            }
            if (playerOneCounter === 3 || playerTwoCounter === 3) {
                console.log(`${activePlayer.name} has won the game on a column!`);
                return true;
            }

         }
         return false;
    }

    const checkDiagonalWin = () => {
        let boardState = Gameboard.getBoard();
        const dimensions = 3;
        let playerOneCounter = 0;
        let playerTwoCounter = 0;
        // diagonal win 
        for (let i = 0; i < dimensions ; i ++){
            let cell =  boardState[i][i];

            if (cell ===  players[0].token){
                    playerOneCounter++;
                    playerTwoCounter = 0;
                    }
              else if(cell === players[1].token){
                playerOneCounter =0;
                playerTwoCounter++;
            }
            else {
                playerOneCounter = 0;
                playerTwoCounter = 0;
            }
        }

        if (playerOneCounter === 3 || playerTwoCounter === 3) {
                console.log(`${activePlayer.name} has won the game on a diagonal!`);
                return true;
            }
            // now check for an anti diagona;

        // reset the counters
        playerOneCounter = 0;
        playerTwoCounter = 0;
       for (let i = 0; i < dimensions ; i ++){
            let cell =  boardState[i][dimensions -1 -i];

            if (cell ===  players[0].token){
                    playerOneCounter++;
                    playerTwoCounter = 0;
                    }
              else if(cell === players[1].token){
                playerOneCounter =0;
                playerTwoCounter++;
            }
            else {
                playerOneCounter = 0;
                playerTwoCounter = 0;
            }
        }
        if (playerOneCounter === 3 || playerTwoCounter === 3) {
                console.log(`${activePlayer.name} has won the game on a diagonal!`);
                return true;
            }
         // if there is no wiiner

         return false;
    }

    const checkForWin = () => {
         return( checkRowWin() || checkColumnWin() || checkDiagonalWin()) === true ? true : false;
    }
    const playRound = (row,col) => {
        console.log(`It's ${activePlayer.name}'s turn`);
        Gameboard.placeMark(row -1, col- 1, activePlayer.token);
        Gameboard.printBoard();
        if (checkForWin() === true){
          console.log(`${activePlayer.name} has won the game! \n Let's play again!`);
            Gameboard.resetBoard();
            switchPlayerTurn();
        }
        else if (turnCounter === 9) 
            {
                console.log(`It's a tie! \n Let's play again!`);
                Gameboard.resetBoard();
                turnCounter  = 1;
                switchPlayerTurn();
    }
        else {
            turnCounter += 1;
            switchPlayerTurn();
        }
    }

    return {playRound}
})();