const deckConstructor = require('../deck.js');
const dealerConstructor = require('../dealer.js');
const lucky21Constructor = require('../lucky21.js');

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

test('Cards should be at value 19 with [ 5, 8, 6 ]', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '06D', '08S', '05H' ];

    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards).toEqual(["05H", "08S", "06D"]);
    expect(game.getCardsValue(game)).toEqual(19);
});

test('Game should be over since the cards value are 25', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '10S', '11H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.isGameOver(game)).toBeTruthy();
});

test('Game should not be finished since the card value is 19', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '08S', '06H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.isGameOver(game)).toBeFalsy();
});

