import { Board } from './board'
import  { EasyMode }  from './easymode'
import  { HardMode }  from './hardmode'
import { winningConditions } from './winningConditions'
class Game {
    fields;
    activePlayer;
    gameActive;
    doesAIMoveFirst = false;
    currentMode = null; // null - pvp

    constructor() {
        this.board = new Board(this.handleItemClick, this.handleReset, this.handleModeChange, this.hoverItemOn, this.hoverItemOff);
        this.board.handleButtonClick()
    }

    validateGame = () => {
        let gameWon = false;
    
        for(let i = 0; i<= winningConditions.length -1; i++) {
            const [posA, posB, posC] = winningConditions[i];
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];
    
            if(value1 != ' ' && value1 === value2 && value1 === value3) {
                gameWon = true;
                this.board.renderWinLine(gameWon, i)
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
        if(name === "hard") return new HardMode();
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
                setTimeout(() => {
                    this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
                }, 1000);
            }
        }
    } 

    hoverItemOn = (e) => {
        const pos = e.target
        if(pos.classList.contains('board__item--filled-X') || pos.classList.contains(`board__item--filled-O`)) {
            return 
        } else {
            pos.classList.add(`board__item--filled-${this.activePlayer}--H`)
        }
    }
    hoverItemOff = (e) => {
        const pos = e.target
        pos.classList.remove(`board__item--filled-X--H`);
        pos.classList.remove(`board__item--filled-O--H`);

    }

    makeMove = position => {
        this.fields[position] = this.activePlayer;

        this.board.getFieldForPosition(position).classList.add(`board__item--filled-${this.activePlayer}`);
        this.board.getFieldForPosition(position).classList.remove(`board__item--filled-${this.activePlayer}--H`);

        this.validateGame();
        this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
        
        if(this.isBoardFull()) {
            this.board.clearCurrentPlayerBoard()
        } 
        if(!this.gameActive) {
            this.board.clearCurrentPlayerBoard()
        }
        if(this.gameActive) {
            this.board.setCurrentPlayer(this.activePlayer);     
        }
    }

    setDefaults = (doesAIMoveFirst) => {
        this.fields = Array.from(' '.repeat(9));
        this.activePlayer = 'X';
        this.gameActive = true;
        this.doesAIMoveFirst = doesAIMoveFirst !== undefined ? doesAIMoveFirst : false;
        this.board.renderWinLine(false);
    };
}



let game = new Game()