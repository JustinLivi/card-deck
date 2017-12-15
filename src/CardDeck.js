const rand = require( 'random-number-csprng' );
const Card = require( './Card.js' );

module.exports = class CardDeck {
    constructor() {
        this.cards = [];
        this.dealt = [];
        for ( let i = 0; i < 52; i += 1 ) {
            this.cards.push( new Card( i ));
        }
    }

    // Fisher-Yates shuffle with async cryptographic number generation
    shuffle() {
        // reset dealt cards
        this.cards = this.cards.concat( this.dealt );
        this.dealt = [];
        // asynchronously simultaneously generate 51 random numbers
        const promises = [];
        for ( let i = 0; i < 51; i += 1 ) {
            promises.push( rand( i, 51 ));
        }
        return Promise.all( promises )
            .then(( randoms ) => {
                randoms.forEach(( rando, index ) => {
                    const temp = this.cards[index];
                    this.cards[index] = this.cards[rando];
                    this.cards[rando] = temp;
                });
            });
    }

    dealOneCard() {
        if ( this.cards.length === 0 ) {
            return undefined;
        }
        const card = this.cards.shift();
        this.dealt.push( card );
        return card;
    }
};
