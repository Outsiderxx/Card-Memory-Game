import GameInfo from './GameInfo.js';
import CardTable from './CardTable.js';
import PopUpDialog from './PopUpDialog.js';

export default class Game extends HTMLElement {
    constructor() {
        super();
        this.gameInfo = new GameInfo();
        this.cardTable = new CardTable();
        this.popUpDialog = new PopUpDialog();
        this.gameInfo.addEventListener('timeUp', (event) => {
            this.popUpDialog.showResult(event.detail.isWin);
            this.cardTable.reset();
            this.gameInfo.reset();
        });
        this.popUpDialog.addEventListener('startGame', () => this.start());
        this.cardTable.addEventListener('match', () => this.gameInfo.matchPairs());
    }

    async start() {
        await this.cardTable.showCardSet();
        this.gameInfo.startCountDown();
    }
}

customElements.define('game-element', Game);