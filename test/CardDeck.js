const chai = require( 'chai' );
const chaiAsPromised = require( 'chai-as-promised' );
const CardDeck = require( '../' );
const Card = require( '../src/Card.js' );

const { expect } = chai;
chai.use( chaiAsPromised );

describe( 'CardDeck', function() {
    it( 'should expose a class with two methods: shuffle() and dealOneCard()', function() {
        expect( CardDeck ).to.be.a( 'function' );
        const deck = new CardDeck();
        expect( deck ).to.be.an.instanceof( CardDeck );
        expect( deck ).to.have.property( 'shuffle' ).and.be.a( 'function' );
        expect( deck ).to.have.property( 'dealOneCard' ).and.be.a( 'function' );
    });

    it( 'should create a deck by default', function() {
        const deck = new CardDeck();
        expect( deck ).to.have.property( 'cards' ).and.be.an( 'array' );
        expect( deck.cards.length ).to.equal( 52 );
        expect( deck.cards[0]).to.be.an.instanceof( Card );
    });

    describe( 'deck.shuffle()', function() {
        it( 'should return a promise that resolves with no value', function() {
            const deck = new CardDeck();
            return expect( deck.shuffle()).to.eventually.not.exist;
        });

        it( 'should randomly permutate cards in deck', function() {
            const deck1 = new CardDeck();
            const deck2 = new CardDeck();
            return deck1.shuffle()
                .then(() => {
                    const shuffledIds = deck1.cards.map( card => card.id );
                    const unshuffledIds = deck2.cards.map( card => card.id );
                    expect( shuffledIds ).to.not.deep.equal( unshuffledIds );
                });
        });

        it( 'should reset dealt cards', function() {
            const deck = new CardDeck();
            deck.dealt = deck.cards.splice( 26 );
            return deck.shuffle()
                .then(() => {
                    expect( deck.cards.length ).to.equal( 52 );
                    expect( deck.dealt.length ).to.equal( 0 );
                });
        });
    });

    describe( 'deck.dealOneCard()', function() {
        it( 'should return the top card from the deck', function() {
            const deck = new CardDeck();
            const topCard = deck.cards[0];
            const dealtCard = deck.dealOneCard();
            expect( dealtCard ).to.equal( topCard );
            expect( deck.cards.length ).to.equal( 51 );
            expect( deck.dealt.length ).to.equal( 1 );
        });

        it( 'should not return a card on the 53rd invocation', function() {
            const deck = new CardDeck();
            for ( let i = 0; i < 52; i += 1 ) {
                deck.dealOneCard();
            }
            expect( deck.dealOneCard()).to.equal( undefined );
            expect( deck.dealt.length ).to.equal( 52 );
        });
    });
});
