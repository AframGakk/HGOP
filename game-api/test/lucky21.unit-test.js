const deckConstructor = require('../deck.js');
const dealerConstructor = require('../dealer.js');
const lucky21Constructor = require('../lucky21.js');
const randomConstructor = require('../random.js');

const newGame = (deck) => {
    const random = randomConstructor();
    const dealerDependencies = {
        'random': (context) => random,
    };
    const dealer = dealerConstructor((name) => dealerDependencies[name]);
    dealer.shuffle = (deck) => { };

    const dependencies = {
        'deck': () => deck || deckConstructor(),
        'dealer': () => dealer,
    };
    return lucky21Constructor((name) => dependencies[name]);
};

describe('game - context construction', () => {
    test('should construct a new game', () => {
        const context = require('../context.js').newContext();

        const gameConstructor = context('lucky21');

        const game = gameConstructor(context);

        expect(game).not.toEqual(50);
    });
});

describe('game - constructor', () => {
    test('should have 50 cards left in the deck', () => {
        const game = newGame(undefined);

        expect(game.state.deck.length).toEqual(50);
    });

    test('should have 2 cards drawn', () => {
        const game = newGame();

        expect(game.state.cards.length).toEqual(2);
    });
});

describe('game - isGameOver', () => {
    test('should be true when the player guesses 21 or under wrong', () => {
        const game = newGame(['03H', '01H', '12H', '09H']);

        game.guess21OrUnder(game);
        game.guess21OrUnder(game);

        expect(game.isGameOver(game)).toEqual(true);
    });

    test('should be true when the player guesses over 21 right', () => {
        const game = newGame(['10H', '12H', '09H']);

        game.guessOver21(game);

        expect(game.isGameOver(game)).toEqual(true);
    });

    test('should be true if the player has lucky 21', () => {
        const game = newGame(['01H', '13H']);

        expect(game.isGameOver(game)).toEqual(true);
    });

    test('should be false if the player is under 21', () => {
        const game = newGame(['12H', '13H']);

        expect(game.isGameOver(game)).toEqual(false);
    });
});

describe('game - playerWon', () => {
    test('should be true if the player guessed over 21 correctly', () => {
        const game = newGame(['10H', '12H', '09H']);

        game.guessOver21(game);

        expect(game.playerWon(game)).toEqual(true);
    });

    test('should be false if the player guesses 21 or under correctly', () => {
        const game = newGame(['03H', '04H', '06H']);

        game.guess21OrUnder(game);

        expect(game.playerWon(game)).toEqual(false);
    });
});

describe('game - getCardsValue', () => {
    test('should be 14 for [ 3, 6, 5 ]', () => {
        const game = newGame(['03H', '06C', '05D']);

        game.guess21OrUnder(game);

        expect(game.getCardsValue(game)).toEqual(14);
    });

    test('should return 14 for [ Q, 9, A ]', () => {
        const game = newGame(['12H', '09H', '01H']);

        game.guess21OrUnder(game);

        expect(game.getCardsValue(game)).toEqual(20);
    });

    test('should return 14 for [ A, A, A, A ]', () => {
        const game = newGame(['01H', '01C', '01D', '01S']);

        game.guess21OrUnder(game);
        game.guess21OrUnder(game);

        expect(game.getCardsValue(game)).toEqual(14);
    });

    test('should return 20 for [ A, Q, 9 ]', () => {
        const game = newGame(['01H', '12H', '9H']);

        game.guess21OrUnder(game);

        expect(game.getCardsValue(game)).toEqual(20);
    });

    test('should return 12 for [ 10, A, A ]', () => {
        const game = newGame(['10H', '01S', '01H']);

        game.guess21OrUnder(game);

        expect(game.getCardsValue(game)).toEqual(12);
    });
});

describe('game - getCardValue', () => {
    test('should return undefined if the player has not made a over 21 guess yet', () => {
        const game = newGame();
        expect(game.getCardValue(game)).toEqual(undefined);
    });

    test('should returns 10 if card is a Jack', () => {
        const game = newGame(['11H', '12H', '13H']);

        game.guessOver21(game);

        expect(game.getCardValue(game)).toEqual(10);
    });

    test('should return 1 if card is ace', () => {
        const game = newGame(['01H', '12H', '13H']);

        game.guessOver21(game);

        expect(game.getCardValue(game)).toEqual(1);
    });
});

describe('game - getTotal', () => {
    test('should return 14 for 5 + [ 3, 6 ]', () => {
        const game = newGame(['05H', '03H', '06C']);

        game.guessOver21(game);

        expect(game.getTotal(game)).toEqual(14);

    });

    test('should return 9 for undefined + [ 3, 6 ]', () => {
        const game = newGame(['03H', '06C']);

        expect(game.getTotal(game)).toEqual(9);
    });

    test('should return 21 for A + [ A, Q, 9 ]', () => {
        const game = newGame(['01C', '01H', '12H', '09H']);

        game.guess21OrUnder(game);
        game.guessOver21(game);

        expect(game.getTotal(game)).toEqual(21);
    });
});

describe('game - getCards', () => {
    test('should return the cards', () => {
        const game = newGame();
        expect(game.getCards(game)).toBe(game.state.cards);
    });
});

describe('game - getCard', () => {
    test('should return the card', () => {
        const game = newGame();

        game.guessOver21(game);

        expect(game.getCard(game)).toBe(game.state.card);
    });
});

describe('game - guess21OrUnder', () => {
    test('should draw the next card', () => {
        const game = newGame(['01C', '01H', '12H', '09H']);

        game.guess21OrUnder(game);

        expect(game.state.deck.length).toEqual(1);
    });

    test('should add next card value to cards', () => {
        const game = newGame(['01C', '01H', '12H', '09H']);

        game.guess21OrUnder(game);

        expect(game.getCards(game)).toEqual(['09H', '12H', '01H']);
    });
});

describe('game - guessOver21', () => {
    test('should draw the next card', () => {
        const game = newGame(['01C', '01H', '12H', '09H']);

        game.guessOver21(game);

        expect(game.state.deck.length).toEqual(1);
    });

    test('should set the card value', () => {
        const game = newGame(['01C', '01H', '12H', '09H']);

        game.guessOver21(game);

        expect(game.getCard(game)).toEqual('01H');
    });
});