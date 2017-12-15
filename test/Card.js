const chai = require( 'chai' );
const Card = require( '../src/Card.js' );

const { expect } = chai;

describe( 'Card', function() {
    it( 'should expose a class with two static members: SUITS and VALUES', function() {
        expect( Card ).to.be.a( 'function' );
        const card = new Card( 0 );
        expect( card ).to.be.an.instanceof( Card );
        expect( Card ).to.have.property( 'SUITS' ).and.deep.equal([
            'Hearts',
            'Spades',
            'Clubs',
            'Diamonds',
        ]);
        expect( Card ).to.have.property( 'VALUES' ).and.deep.equal([
            'Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King',
        ]);
    });

    it( 'should throw on invalid id', function() {
        expect(() => new Card()).to.throw( 'ID \'undefined\' is invalid for class Card. Must be an integer between 0 and 51 inclusive.' );
        expect(() => new Card( -1 )).to.throw( 'ID \'-1\' is invalid for class Card. Must be an integer between 0 and 51 inclusive.' );
        expect(() => new Card( 52 )).to.throw( 'ID \'52\' is invalid for class Card. Must be an integer between 0 and 51 inclusive.' );
    });

    it( 'should convert id to suit and value', function() {
        const aceOfHearts = new Card( 0 );
        expect( aceOfHearts ).to.have.property( 'suit' ).and.equal( 'Hearts' );
        expect( aceOfHearts ).to.have.property( 'value' ).and.equal( 'Ace' );
        const kingOfDiamonds = new Card( 51 );
        expect( kingOfDiamonds ).to.have.property( 'suit' ).and.equal( 'Diamonds' );
        expect( kingOfDiamonds ).to.have.property( 'value' ).and.equal( 'King' );
    });
});
