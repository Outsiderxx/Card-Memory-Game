export default class PopUpDialog extends HTMLElement {
    constructor() {
        super();
        this.background = document.querySelector('#popUpDialogBG');
        this.statusText = this.background.querySelector('pre');
        this.confirmBtn = document.querySelector('button');
        this.confirmBtn.addEventListener('click', () => {
            this.background.style.display = 'none';
            this.dispatchEvent(new Event('startGame'));
        });
    }

    showResult(isWin) {
        this.background.style.display = 'block';
        if (isWin) {
            this.statusText.textContent = 'You Win! Press button to restart the game.';
        } else {
            this.statusText.textContent = 'You Lose! Press button to restart the game.';
        }
    }
}

customElements.define('pop-up-dialog', PopUpDialog);