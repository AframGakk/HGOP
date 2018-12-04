const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('guess21OrUnder should draw the next card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
        '05C', '01D', '09S', '10H',
    ];
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
});