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

test('Should give the highest value possible as 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '06D', '08S', '05H' ];

    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    //game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards).toEqual(["05H", "08S"]);
    expect(game.getCardsValue(game)).toEqual(21);
});

test('Should give the highest value possible as 15', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '06D', '02S', '02H' ];

    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    //game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards).toEqual(["02H", "02S"]);
    expect(game.getCardsValue(game)).toEqual(15);
});

test('Player should have won after choosing under 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '02D', '07S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.playerWon(game)).toBeTruthy();
});


test('Player should have lost after choosing under 21 and he busts', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '09D', '07S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.playerWon(game)).toBeFalsy();
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

test('Game state should return card 10 since the cards sum is 12 because a card 10 will exceed 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Act


    // Assert
    expect(game.getCardValue(game)).toEqual(10);
});

test('Game state should return card 10 since the cards sum is 12 because a card 10 will exceed 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Act


    // Assert
    expect(game.getCardValue(game)).toEqual(10);
});


test('Gets hand total of 12', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Assert
    expect(game.getTotal(game)).toEqual(12);
});

test('Gets hand total of 17 after one guess', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.getTotal(game)).toEqual(17);
});

test('Gets players cards', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Act
    // game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.getCards(game)).toEqual(['08H', '04S']);
});

test('Gets players cards after  one guess', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.getCards(game)).toEqual(['08H', '04S', '05D']);
});
