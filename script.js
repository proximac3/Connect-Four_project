//top colum Selector
const topColumnSelector = document.querySelector('.topcolumn')
//Board elemet selector.
const boardElements = document.querySelector('.game-elements')
//Results Div selector
const results = document.getElementById('results')

//Game over element.
const gameOver = document.createElement(`div`)
gameOver.innerText = `GAME OVER`
gameOver.setAttribute(`id`, 'gameOver')

//player 1 won element
const player1Win = document.createElement('div')
player1Win.innerText = `Player 1 Won`
player1Win.setAttribute(`id`, `p1`)

//player 2 won element
const player2Win = document.createElement('div')
player2Win.innerText = `Player 2 Won`
player2Win.setAttribute(`id`, `p2`)


//start game button 
const startGame = document.getElementById('btn-1')
count = 0;
startGame.addEventListener('click', function () {
    
    if (count < 1) {
        
        //Players class
        class Players {
            constructor(playerName, playerNum) {
                this.playerName = playerName;
                this.playerNum  =playerNum
            };
        }
    
        //Connect Four class
        class ConnectFour {
            constructor(rows, colums) {
                this.rows = rows;
                this.colums = colums;
            }
    
            //make a 2d array model of the board.
            makeGameBoard() {
                const board = []
    
                for (let i = 0; i < this.rows; i++) {
                    board[i] = [];
                    for (let j = 0; j < this.colums; j++) {
                        board[i][j] = null
                    }
                }
                return board
            }
    
            //create top colums & append Element to DOM
            topColumn(array) {
                let indexPos = 0
                for (let elem of array) {
                    const newDiv = document.createElement('div');
                    newDiv.setAttribute('class', 'boxes')
                    newDiv.setAttribute('id',`${indexPos}`)
                    topColumnSelector.append(newDiv)
                    // newDiv.innerText = indexPos
                    indexPos++
                }
            }
            
            //Create board Elements and append to the DOM
            boardModel(array) {
                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array[i].length; j++) {
                        const newDiv = document.createElement('div');
                        newDiv.setAttribute('class', 'game-boxes')
                        newDiv.setAttribute('id', `null`)
                        boardElements.append(newDiv)
                        
                        //tabs with color.
                        const ColorTabs = document.createElement('div')
                        newDiv.append(ColorTabs)
            
                    }
                }
            }
    
            //Live board Model to Implement logic
            liveModel() {
                const arrayOfModel = Array.from(document.getElementsByClassName('game-boxes'))
                const modelOfboard = [arrayOfModel.slice(0, 7), arrayOfModel.slice(7, 14), arrayOfModel.slice(14, 21), arrayOfModel.slice(21, 28), arrayOfModel.slice(28, 35), arrayOfModel.slice(35)]
                
                return modelOfboard
            }
    
            //Algarithm to check for horizontal wins
            horizontaWinCheck(board) {
                let Player1Counter = 0;
                let Player2Counter = 0;
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length - 1; j++){
                        // check and incrment payer 1 counter
                        if (board[i][j].id === '1' && board[i][j + 1].id === '1') {
                            Player1Counter++
                        } else {
                            Player1Counter = 0
                        };
                            
                        //increment player 2 counter
                        if (board[i][j].id === `2` && board[i][j+1].id === `2`) {
                            Player2Counter++
                        } else {
                            Player2Counter = 0;
                        }
    
                        // Check if pleyer 1 or pleyer 2 has won
                        if (Player1Counter === 3) {
                            return `Player one won`
                        } else if (Player2Counter === 3) {
                            return `Player 2 won`
                        }
                    }
                }
    
                return undefined
            }
    
    
            // Algorithm to check for diagonal win
            // src: https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
            diagonal(array, bottomToTop) {
                var Ylength = array.length;
                var Xlength = array[0].length;
                var maxLength = Math.max(Xlength, Ylength);
                var temp;
                for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
                    temp = [];
                    for (var y = Ylength - 1; y >= 0; --y) {
                        var x = k - (bottomToTop ? Ylength - y : y);
                        if (x >= 0 && x < Xlength) {
                            temp.push(array[y][x]);
                        }
                    }
    
                    if (temp.length >= 4) {
                        let player1Counter = 0;
                        let player2Counter = 0;
                        for (let i = 0; i < temp.length; i++){
                            if (temp[i].id === `1`) {
                                player1Counter = player1Counter + 1
                            }
            
    
                            if (temp[i].id === `2`) {
                                player2Counter = player2Counter + 1
                            }
    
                        }
                        if (player1Counter === 4) {
                            return `Player 1 wins the game`
                        } else if (player2Counter === 4) {
                            return `Player 2 wins the game`
                        }
                    }
                }
                return `We do not have a winner yet.`
            }
    
    
        }
    
        // Top columns
        const topColumnArray = [[null],[null],[null],[null],[null],[null],[null]]
    
        //Create connect four game
        const game = new ConnectFour(6, 7)
    
        //create top column.
        game.topColumn(topColumnArray)
    
        //creat array of board, used to create elemets for board in boardModel below.
        const ModelofBoard = game.makeGameBoard()
    
        //create board/grid.
        game.boardModel(ModelofBoard)
    
        //Live model of board in array form to implement logic.
        const liveModelArray = game.liveModel()
    
        //Keep track of spots left on board.
        let spotsLeft = 42
    
    
        // creating players.
        const playerOne = new Players('Hale Comstock', 1)
        const playerTwo = new Players('Andrey Ryan', 2)
        let currentPlayer = playerOne
        
        // stopping game fter winner
        let gamePlay = true
    
    
    
        document.querySelector('.topcolumn').addEventListener('click', function (e) {
            e.preventDefault()
            
            //Switching players
            currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne
    
            // dropping targets onto board
            var id = e.target.id
            let count = liveModelArray.length - 1
            
             if (gamePlay === true) {
                while (count !== -1) {
                    if (liveModelArray[count][id].id === 'null') {
                        if (currentPlayer === playerOne) {
                            liveModelArray[count][id].childNodes[0].setAttribute('class', 'blue')
                            liveModelArray[count][id].setAttribute('id', `${currentPlayer.playerNum}`)
                        } else {
                            liveModelArray[count][id].childNodes[0].setAttribute('class', 'red')
                            liveModelArray[count][id].setAttribute('id', `${currentPlayer.playerNum}`)
                        }
                        break
                    }
                    count--
                }
    
            //horizontally checking board for winner and append Winner to DOM
            if (game.horizontaWinCheck(liveModelArray) === `Player 2 won`) {
                results.append(player2Win)
                gamePlay = false
            } else if (game.horizontaWinCheck(liveModelArray) === `Player one won`) {
                results.append(player1Win)
                gamePlay = false
            }
    
    
    
            //vertical Algo, cheking board for win
            function verticalWinCheck(board) {
                let pleyer2Counter = 0;
                let pleyer1Counter = 0;
                for (let i = 0; i < board.length; i++) {
                    //increment player 2 counter
                        if (board[i][id].id === '2') {
                            pleyer2Counter++
                        } else {
                            pleyer2Counter = 0
                        }
                        
                        //incremnt player 1 counter
                        if (board[i][id].id === `1`) {
                            pleyer1Counter++
                        } else {
                            pleyer1Counter = 0
                        }
                        
                        // Check for win
                        if (pleyer1Counter === 4) {
                            return 'Player 1 Won'
                        } else if (pleyer2Counter === 4) {
                            return `player 2 won`
                        }
                    }
                    return undefined
                }
                
            
            //vertically checking board for win & appending winner to DOM
            if (verticalWinCheck(liveModelArray) === 'Player 1 Won') {
                results.append(player1Win)
                gamePlay = false
            } else if (verticalWinCheck(liveModelArray) === 'player 2 won') {
                results.append(player2Win)
                gamePlay = false
                }
    
            
            // Check board for diagonal win
            if (game.diagonal(liveModelArray) === `Player 1 wins the game`) {
                results.append(player1Win)
                gamePlay = false
            } else if (game.diagonal(liveModelArray) === `Player 2 wins the game`) {
                results.append(player2Win)
                gamePlay = false
            }
            
            if (game.diagonal(liveModelArray, true) === `Player 1 wins the game`) {
                results.append(player1Win)
                gamePlay = false
            } else if (game.diagonal(liveModelArray, true) === `Player 2 wins the game`) {
                results.append(player2Win)
                gamePlay = false
            }
            
            // check if board is full
            spotsLeft--
            if (spotsLeft === 0) {
                results.append(gameOver)
                gamePlay = false
            }
        })
    }
    count++
})


