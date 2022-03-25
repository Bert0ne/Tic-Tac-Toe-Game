export class Board {
    fieldsElements = document.querySelectorAll('.board__item');
    panel = document.querySelector('.panel');
    button = document.querySelector('.reset-button');
    modeSelect = document.querySelector('#mode-select');
    currentPlayerTag = document.getElementById('current-player')


    constructor(onItemClick, onButtonClick, onModeChange) {
        this.onButtonClick = onButtonClick;
        this.button.addEventListener('click', this.handleButtonClick);

        this.fieldsElements.forEach(field => {
            field.addEventListener('click', onItemClick)
        })
        this.modeSelect.addEventListener('change', onModeChange)
    };

    setCurrentPlayer = (player) => {
            this.currentPlayerTag.innerText = `Player ${player} move`;
    };
    clearCurrentPlayerBoard = () => {
        this.currentPlayerTag.innerText = ' ';
    }

    handleButtonClick = () => {
        this.resetBoard();
        this.onButtonClick(); 
    };

    resetBoard = () => {
        this.resetBoardClasses();
        this.clearMessage();
        this.setCurrentPlayer('X')
    }

    resetBoardClasses = () => {
        this.fieldsElements.forEach(field => {
            field.classList.remove('board__item--filled-X', 'board__item--filled-O')
        })
    };

    getFieldForPosition = (position) => {
        return this.fieldsElements[position];
    } 

    displayWinMessage = activePlayer => {
        this.panel.innerHTML = `Player ${activePlayer} Win`
    };
    
    displayTieMessage = () => {
        this.panel.innerHTML = 'Draw';
    };
    
    clearMessage = () => {
        this.panel.innerHTML = ' ';
    };
}
