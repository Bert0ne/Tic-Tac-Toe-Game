export class Board {
    fieldsElements = document.querySelectorAll('.board__item');
    panel = document.querySelector('.panel');
    button = document.querySelector('.reset-button');
    modeSelect = document.querySelector('#mode-select');
    currentPlayerTag = document.getElementById('current-player')
    winLine = document.querySelector('.winLine');

    constructor(onItemClick, onButtonClick, onModeChange, hoverItemOn, hoverItemOff) {
        this.onButtonClick = onButtonClick;
        this.button.addEventListener('click', this.handleButtonClick);

        this.fieldsElements.forEach(field => {
            field.addEventListener('click', onItemClick)
        });

        this.modeSelect.addEventListener('change', onModeChange);

        this.fieldsElements.forEach(el => {
            el.addEventListener('mouseover', hoverItemOn)
        });

        this.fieldsElements.forEach(el => {
            el.addEventListener('mouseleave', hoverItemOff)
        })
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

    renderWinLine = (gameWon, option = 0) => {

        let prop = {
                0: [0,30,50],
                1: [0, 100, 50],
                2: [0, 170, 50],
                3: [90, 100, 15],
                4: [90, 100, 50],
                5: [90, 100, 85],
                6: [45, 100, 50],
                7: [-45, 100, 50],
            }

            this.winLine.style.setProperty('display', `${gameWon ? 'block' : 'none'}`);
            
            this.winLine.style.setProperty('transform', `rotate(${prop[`${option}`][0]}deg)`);
            this.winLine.style.setProperty('top', `calc(${prop[`${option}`][1]}% / 2)`);
            this.winLine.style.setProperty('left', `calc(${prop[`${option}`][2]}% - (420px / 2))`);
 
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
