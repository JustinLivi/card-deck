# Overview

Dead simple, poker-style playing card deck.

# Dependencies

1. [Node](https://nodejs.org/en/)

# Usage

```javascript
const CardDeck = require( 'card-deck' );

const deck = new CardDeck();
// asynchronously shuffles deck
// mutates deck
deck.shuffle()
.then(() => {
    // returns top card and removes it from the deck
    // mutates deck
    const card = deck.dealOneCard();
    console.log( card.value );
});
```

# Tests

1. clone repo
1. `$ npm install`
1. `$ npm test`

Code coverage can be viewed in ./coverage
