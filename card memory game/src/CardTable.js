export default class CardTable extends HTMLElement {
    constructor() {
        super();
        this.canChoose = false;
        this.pairLeft = 8;
        this.cardIdxs = [];
        this.previosCardIdx = null;
        this.cardTable = document.querySelector('#cardTable');
        this.cardSet = document.querySelectorAll('.cardWrap');
        this.cardSet.forEach((card, idx) => card.addEventListener('click', () => this.chooseCard(idx)));
    }

    async showCardSet() {
        this.cardIdxs = this.generateCards();
        this.cardSet.forEach((card, idx) => {
            const cardIdx = `${this.cardIdxs[idx]}`;
            card.className = 'cardWrap reverse';
            card.querySelector('.cardFront').style.backgroundImage = 'url(./res/' + cardIdx + '.png)';
        });
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.cardSet.forEach((card) => {
            card.className = 'cardWrap';
        });
        this.canChoose = true;
    }

    async chooseCard(idx) {
        if (this.canChoose) {
            this.canChoose = false;
            this.cardSet[idx].className = 'cardWrap reverse';
            if (this.previosCardIdx !== null && this.previosCardIdx !== idx) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (this.cardIdxs[idx] % 13 === this.cardIdxs[this.previosCardIdx] % 13) {
                    this.pairLeft--;
                    this.cardSet[idx].style.visibility = 'hidden';
                    this.cardSet[this.previosCardIdx].style.visibility = 'hidden';
                    this.dispatchEvent(new Event('match'));
                }
                this.cardSet[idx].className = 'cardWrap';
                this.cardSet[this.previosCardIdx].className = 'cardWrap';
                this.previosCardIdx = null;
            } else {
                this.previosCardIdx = idx;
            }
            if (this.pairLeft > 0) {
                await new Promise(resolve => setTimeout(resolve, 200));
                this.canChoose = true;
            }
        } 
    }

    reset() {
        this.cardSet.forEach(card => {
            card.style.visibility = 'visible';
            card.className = 'cardWrap';
        });
        this.canChoose = false;
        this.pairLeft = 8;
    }

    generateCards() {
        const cards = [];
        const haveUsed = [];
        for (let i = 0; i < 8; i++) {
            while (true) {
                const rnd = Math.floor(Math.random() * 13) + 1;
                if (!haveUsed.some((value) => value === rnd)) {
                    cards.push(rnd + Math.floor(Math.random() * 4) * 13, rnd + Math.floor(Math.random() * 4) * 13);
                    haveUsed.push(rnd);
                    break;
                }
            }
        }
        return cards.sort(() => Math.random() - 0.5);
    }
}

customElements.define('card-table', CardTable);