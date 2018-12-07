const deckConstructor = require('../deck.js');
const dealerConstructor = require('../dealer.js');
const lucky21Constructor = require('../lucky21.js');
const randomConstructor = require('../random.js');

const gameinit = () => {
    let dependencies = {
        'deck': deckConstructor,
        'dealer': dealerConstructor,
        'random': randomConstructor(),
    };
    return lucky21Constructor((name) => dependencies[name]);
};

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
    let game = gameinit();

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

    let game = gameinit();

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

    let game = gameinit();

    // Act
    //game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards).toEqual(["02H", "02S"]);
    expect(game.getCardsValue(game)).toEqual(15);
});

/* TODO: Finish the ACE problem
test('Player gets ace at draw, the ace should give 1 since 11 exceeds 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '01D', '07S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.getTotal(game)).toBeEqual(16);
});
*/

test('Player should have won after choosing under 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '02D', '07S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};

    let game = gameinit();

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

    let game = gameinit();

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

    let game = gameinit();

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

    let game = gameinit();

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
    let game = gameinit();

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
    let game = gameinit();

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
    let game = gameinit();

    // Assert
    expect(game.getTotal(game)).toEqual(12);
});

test('Gets hand total of 17 after one guess', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

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
    let game = gameinit();

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
    let game = gameinit();

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.getCards(game)).toEqual(['08H', '04S', '05D']);
});

test('Gets players cards after  one guess', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.getCards(game)).toEqual(['08H', '04S', '05D']);
});

test('Getting a card should be undefined since the user has not guessed', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Assert
    expect(game.getCard(game)).toBeUndefined();
});

test('Getting a card after a choice should be 05D and defined', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Action
    game.guess21OrUnder(game);

    // Assert
    expect(game.getCard(game)).toBeDefined();
    expect(game.getCard(game)).toEqual('05D');
});

test('Should add a card to hand when guessing over', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Action
    game.guessOver21(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('05D');
    expect(game.state.card).toEqual('05D');
});

test('Should loose since the hand did not exceed 21 but quessed to go over', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '04S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Action
    game.guessOver21(game);

    // Assert
    expect(game.playerWon(game)).toBeFalsy();
});

test('Should win since the hand exceeds 21 and guessed right', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [ '02C', '05D', '10S', '08H' ];
    let dealer = dealerConstructor();
    dealer.shuffle = (deck) => {};
    let game = gameinit();

    // Action
    game.guessOver21(game);

    // Assert
    expect(game.playerWon(game)).toBeTruthy();
});
