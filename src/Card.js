const SUITS = [
    'Hearts',
    'Spades',
    'Clubs',
    'Diamonds',
];
const VALUES = [
    'Ace',
];
for ( let i = 2; i < 11; i += 1 ) {
    VALUES.push( i );
}
VALUES.push(
    'Jack',
    'Queen',
    'King'
);

module.exports = class Card {
    static get SUITS() {
        return SUITS;
    }

    static get VALUES() {
        return VALUES;
    }

    constructor( id ) {
        if ( !Number.isInteger( id ) || id < 0 || id > 51 ) {
            throw new TypeError( `ID '${id}' is invalid for class Card. Must be an integer between 0 and 51 inclusive.` );
        }
        this.id = id;
        this.suit = SUITS[Math.floor( id / 13 )];
        this.value = VALUES[id % 13];
    }
};
