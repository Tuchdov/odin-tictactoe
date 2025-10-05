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
    const Players = [
        playerOne ,
        playerTwo
    ]

    let activePlayer = Players[0];

    const switchPlayerTurn = ()=>{
        activePlayer= activePlayer === Players[0] ? Players[1] : Players[0];
    }

    const playRound = (row,col) => {
        console.log(`It's ${activePlayer.name}'s turn`);
        Gameboard.placeMark(row -1, col- 1, activePlayer.token);
    }
})();