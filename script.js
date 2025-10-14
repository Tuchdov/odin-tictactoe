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
             // if the cell is  empty mark the cell
             if (board[row][coll] === '') {
              board[row][coll] = mark;
              return true;
        }
            else{
                return false;
            }
    }
      
    

    const printBoard = () =>{
        displayController.setMessage(getBoard());
    }

    const resetBoard = () => {
        // this modifies the exisiting array structure instead of rebuilding it
        for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            board[i][j] = '';

        }}
    }


return {getBoard, placeMark, resetBoard, printBoard  }
}
)();    




const Player = function(name, token){
    return {name,
        token}
};



// createa a display controller model to create the correct structure in html
const displayController = (function(){
    const dimensions = 3;
    const massageBoard =  document.createElement('h2');
    const boardContainer = document.createElement('div');
    document.body.appendChild(massageBoard);
    document.body.appendChild(boardContainer);
    boardContainer.classList.add('board');

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart-button');
    document.body.appendChild(restartButton);

    // add a message to the message board
    const  setMessage = (message) => {
        massageBoard.textContent = message;
    };

    // create a board container and 9 divs in a nested for loop
    for(let i = 0; i < dimensions; i++){
        for(let j = 0 ; j < dimensions; j++){
            // create <div class="cell" data-row="1" data-col="2"></div>
            let cell = document.createElement('div')
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            boardContainer.appendChild(cell);
        }
    }

    boardContainer.addEventListener('click', (e) => {
        // If the game is over, don't do anything
         if (gameController.getIsGameOver()) return;
        // find the closest cell to the clicked elemecnt
        const cell  = e.target.closest('div.cell');
        // if the click was not iside a cell do nothing
        if (! cell) return;
        else {
            const row = parseInt(cell.dataset.row,10); 
            const col = parseInt(cell.dataset.col, 10); 
            gameController.playRound(row + 1, col + 1);
        }
    });

    const updateDisplay = () => {
        // get the current state of the game board  
        const boardState = Gameboard.getBoard();
        const size = 3
        // Loop through the board array.
        for(let i =0 ; i < size; i++){
            for(let j =0; j < size; j++){
                // string for the specific cell
                const selector = `.cell[data-row="${i}"][data-col="${j}"]`;
                // query for the specific element
                const cell = document.querySelector(selector);
                cell.textContent = boardState[i][j];
            }
        }
      

        
    }


    return {updateDisplay, setMessage}

})();

const gameController = (function () {
    const form = document.getElementById('player-form');
    const overlay = document.querySelector('.modal-overlay');
    const firstInput = form ? form.querySelector('#player1') : null;
    const restartButton = document.querySelector('.restart-button');
    const players = [];

    let turnCounter = 1;

    let activePlayer = null;
    let isGameOver = true;

    const ensurePlayersReady = () => players.length === 2;

    const getIsGameOver = () => {return isGameOver};

    const switchPlayerTurn = ()=>{
        if (!ensurePlayersReady()) return;
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // wining conditions
    const  checkRowWin = ()=> {
        if (!ensurePlayersReady()) return false;
        let boardState = Gameboard.getBoard();
        const dimensions = 3;

        for (let i = 0; i < dimensions ; i ++){
            let playerOneCounter = 0;
            let playerTwoCounter = 0;
            for (let j = 0; j < dimensions; j++){
            let    cell = boardState[i][j];
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
                displayController.setMessage(`${activePlayer.name} has won the game on a row!`);
                return true;
            }

         }
         return false;
    }

    const checkColumnWin = () => {
        if (!ensurePlayersReady()) return false;
         let boardState = Gameboard.getBoard();
        const dimensions = 3;

        for (let i = 0; i < dimensions ; i ++){
            let playerOneCounter = 0;
            let playerTwoCounter = 0;
            for (let j = 0; j < dimensions; j++){
            let     cell = boardState[j][i];
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
                displayController.setMessage(`${activePlayer.name} has won the game on a column!`);
                return true;
            }

         }
         return false;
    }

    const checkDiagonalWin = () => {
        if (!ensurePlayersReady()) return false;
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
                displayController.setMessage(`${activePlayer.name} has won the game on a diagonal!`);
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
                displayController.setMessage(`${activePlayer.name} has won the game on a diagonal!`);
                return true;
            }
         // if there is no wiiner

         return false;
    }

    const checkForWin = () => {
         return( checkRowWin() || checkColumnWin() || checkDiagonalWin()) === true ? true : false;
    }
    const playRound = (row,col) => {
        if (!ensurePlayersReady() || isGameOver) return false;
        const roundResolt= Gameboard.placeMark(row -1, col- 1, activePlayer.token);
        if (roundResolt === false){
            displayController.setMessage("That cell is taken!");
            return false
        }
        
            else {
            displayController.updateDisplay();

            if (checkForWin() === true){
                displayController.updateDisplay();
                displayController.setMessage(`${activePlayer.name} has won the game! \n Let's play again!`);
                isGameOver = true;
                return // stop the game
            }
            else if (turnCounter === 9) 
                {
                    displayController.setMessage(`It's a tie! \nLet's play again!`);
                    Gameboard.resetBoard();
                    isGameOver = true;
                    return;

        }
            else {
                turnCounter += 1;
                switchPlayerTurn();
            displayController.setMessage(`It's ${activePlayer.name}'s turn`);
            }
            }

       
    }
    const startGame = (playerOneName, playerTwoName) => {
        const nameOne = playerOneName || 'Player 1';
        const nameTwo = playerTwoName || 'Player 2';
        players.length = 0;
        players.push(Player(nameOne, 'X'), Player(nameTwo, 'O'));
        activePlayer = players[0];
        turnCounter = 1;
        isGameOver = false;
        Gameboard.resetBoard();
        displayController.updateDisplay();
        displayController.setMessage(`Let's play tic-tac-toe!  \n It's ${activePlayer.name}'s turn.`);
    };

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerOneName = form.player1.value.trim();
            const playerTwoName = form.player2.value.trim();
            startGame(playerOneName, playerTwoName);
            if (overlay) {
                overlay.classList.add('is-hidden');
            }
            form.reset();
        });
    }

    if (firstInput) {
        firstInput.focus();
    }

    if (restartButton) {
        restartButton.addEventListener('click', () => {
            if (!ensurePlayersReady()) return;
            Gameboard.resetBoard();
            displayController.updateDisplay();
            turnCounter = 1;
            isGameOver = false;
            switchPlayerTurn();
            displayController.setMessage(`It's ${activePlayer.name}'s turn`);
        });
    }

    return {playRound, getIsGameOver}
})();
