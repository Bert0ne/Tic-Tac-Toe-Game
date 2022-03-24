import { Board } from './board'
import  { EasyMode }  from './easymode'

class Game {
    fields;
    activePlayer;
    gameActive;
    doesAIMoveFirst = false;
    currentMode = null; // null - pvp

    winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ];

    constructor() {
        this.board = new Board(this.handleItemClick, this.handleReset, this.handleModeChange);
        this.setDefaults();
    }

    validateGame = () => {
        let gameWon = false;
    
        for(let i = 0; i<= this.winningConditions.length -1; i++) {
            const [posA, posB, posC] = this.winningConditions[i];
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];
    
            if(value1 != ' ' && value1 === value2 && value1 === value3) {
                gameWon = true;
                break;
            } 
        }
        if(gameWon) {
            this.gameActive = false;
            this.board.displayWinMessage(this.activePlayer) 
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.board.displayTieMessage()
        }    
    }
    
    isBoardFull = () => {
        return this.fields.every(field => field !== ' ')
    };

    handleModeChange = (e) => {
        this.currentMode = this.getModeClassForName(e.target.value);
        this.setDefaults(false);
        this.board.resetBoard()
    }

    getModeClassForName = (name) => {
        if(name === "easy") return new EasyMode();
        return null;

    }

    handleReset = () => {
        this.setDefaults(!this.doesAIMoveFirst);
        this.AIsFirstMove();
    };

    AIsFirstMove = () => {
        if(this.doesAIMoveFirst && this.currentMode !== null) {
            this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
        }
    }

    handleItemClick = (e) => {
        const {pos} = e.target.dataset;
        
        if(this.gameActive && this.fields[pos] === ' ') {
            this.makeMove(pos)

            if(this.gameActive && this.currentMode !== null) {
                this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
            }
        }
    } 

    makeMove = position => {
        this.fields[position] = this.activePlayer;
        this.board.getFieldForPosition(position).classList.add(`board__item--filled-${this.activePlayer}`);
        this.validateGame();
        this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
    }

    setDefaults = (doesAIMoveFirst) => {
        this.fields = Array.from(' '.repeat(9));
        this.activePlayer = 'X';
        this.gameActive = true;
        this.doesAIMoveFirst = doesAIMoveFirst !== undefined ? doesAIMoveFirst : false;
    };
}



let game = new Game()