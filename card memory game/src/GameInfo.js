export default class GameInfo extends HTMLElement{
    constructor() {
        super();
        this.intervalID = 0;
        this.matchNum = 0;
        this.pastTime = 0;
        this.gameDuration = 60;
        this.startTime = 0;
        this.timerText = document.querySelector('#timer');
        this.matchText = document.querySelector('#match');
        this.progressBar = document.querySelector('progress');
    }

    matchPairs() {
        this.matchNum++;
        this.matchText.textContent = `matchNum: ${this.matchNum} / 8`;
        if (this.matchNum === 8) {
            clearInterval(this.intervalID);
            this.dispatchEvent(new CustomEvent('timeUp', { detail: { isWin: true } }));
        }
    }

    startCountDown() {
        this.startTime = Date.now();
        this.intervalID = setInterval(this.update.bind(this), 1 / 60);
    }

    update() {
        const currentTime = Date.now();
        this.pastTime = (currentTime - this.startTime) / 1000;
        this.timerText.textContent = 'timer: 00 : ' + (this.gameDuration - this.pastTime < 10 ? '0' : '') + `${Math.floor(this.gameDuration - this.pastTime)}`;
        this.progressBar.value = this.pastTime / this.gameDuration * 100;
        if (this.pastTime >= this.gameDuration) {
            clearInterval(this.intervalID);
            this.timerText.textContent = 'timer: 00 : 00';
            this.progressBar.value = 100;
            this.dispatchEvent(new CustomEvent('timeUp', { detail: { isWin: false } }));
        }
    }

    reset() {
        this.pastTime = 0;
        this.matchNum = 0;
        this.timerText.textContent = 'timer : 01 : 00';
        this.matchText.textContent = 'matchNum: 0 / 8';
        this.progressBar.value = 0;
    }
}

customElements.define('game-info', GameInfo)