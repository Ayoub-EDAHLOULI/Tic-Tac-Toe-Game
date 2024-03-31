const cellItems = document.getElementsByClassName('cellBoard');
const reset = document.querySelector('#reset');
const playerTurn = document.getElementById('playerTurn');
const roundWinner = document.querySelector('.roundWinner');
const roundDraw = document.querySelector('.roundDraw');
const nextRound = document.querySelector('#next');
const playAgin = document.querySelector('#playAgin');
let currentTurn = "X"
let gameFinished = false

let boardArray = [
  '0','1','2',
  '3','4','5',
  '6','7','8'
]

function initializeGame() {
  for(const cell of cellItems){
    cell.addEventListener('click', () => {
      let value = parseInt(cell.getAttribute('value'));
      const cellContent = document.querySelector(`.cellBoard[value="${value}"] .cellContent`);
      //Check if the game is finished
      if(gameFinished == true){
        return
      }
      //Check if the cell is empty
      if(boardArray[value] == "X" || boardArray[value] == "O"){
        return
      }
      cellContent.innerHTML = currentTurn
      boardArray[value] = currentTurn
      
      //Set the color of X and O
      if(cellContent.innerHTML == "X"){
        cellContent.style.color = "#33c2c0"
      }else{
        cellContent.style.color = "#efb537"
      }
      
      //Change the current Turn to X or O
      if(currentTurn == "X"){
        currentTurn = "O";
      }else{
        currentTurn = "X";
      }
  
      //Asset Turn X or O
      playerTurn.innerHTML = `${currentTurn} Turn`;
  
      evaluateBoard()
      
      // Add click event listener to reset button
      reset.addEventListener('click', () => {
        cellContent.innerHTML = "";
        boardArray = [
          '0','1','2',
          '3','4','5',
          '6','7','8'
        ]
        gameFinished = false
        currentTurn = "X"
        playerTurn.innerHTML = `X Turn`;
      })
    })
  
    const evaluateBoard = () => {
      if(
        /* Rows */
        (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2])||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5])||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8])||
  
        /* Coloms */
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6])||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7])||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8])||
  
        /* Diagonal */
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])||
        (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6])
  
      ){
        let winner = currentTurn == "X" ? "O" : "X";

        /* Colorize The Center */
        if(winner == "X"){
          document.querySelector('.center').style.color = "#31c4be"
        }else{
          document.querySelector('.center').style.color = "#efb537"
        }

        document.getElementById('winner').innerHTML = `${winner}`
        roundWinner.style.display = "block"
        
        /* Next Round Button */
        nextRound.addEventListener('click', () => {
          roundWinner.style.display = "none";
        })

        /* Play Again Button */
        playAgin.addEventListener('click', () => {
          roundDraw.style.display = "none";
        })
  
        gameFinished = true
  
        boardArray = [
          '0','1','2',
          '3','4','5',
          '6','7','8'
        ]
      }
  
      let gameDraw = true
      for(const cell of boardArray){
        if(cell != "X" && cell != "O"){
          gameDraw = false
        }
      }
  
      if(gameDraw){
        //alert('Nobody Won')
        roundDraw.style.display = "block"
        initializeGame()
        gameFinished = true
      }
    }
  }
}

initializeGame()