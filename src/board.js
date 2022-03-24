export class Board {
    fieldsElements = document.querySelectorAll('.board__item');
    panel = document.querySelector('.panel');
    button = document.querySelector('.reset-button');
    modeSelect = document.querySelector('#mode-select');


    constructor(onItemClick, onButtonClick, onModeChange) {
        this.onButtonClick = onButtonClick;
        this.button.addEventListener('click', this.handleButtonClick);

        this.fieldsElements.forEach(field => {
            field.addEventListener('click', onItemClick)
        })
        this.modeSelect.addEventListener('change', onModeChange)
    };

    handleButtonClick = () => {
        this.resetBoard();
        this.onButtonClick(); 
    };

    resetBoard = () => {
        this.resetBoardClasses();
        this.clearMessage();
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
        this.panel.innerHTML = `Wygrał ${activePlayer}`
    };
    
    displayTieMessage = () => {
        this.panel.innerHTML = 'Remis'
    };
    
    clearMessage = () => {
        this.panel.innerHTML = ''
    };
}
