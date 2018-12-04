module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: undefined,
    };

    let calcCard = (card) => {
        let number = card.substring(0, 2);

        if(parseInt(number) < 10 && parseInt(number) > 1) {
            return parseInt(number);
        } else if (parseInt(number) == 1) {
            return 11;
        } else {
            return 10;
        }
    };

    let getHandSum = (cards) => {
        let sum = 0;
        cards.forEach((item) => {
            sum += calcCard(item);
        });
        return sum;
    }

    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            return getHandSum(game.state.cards) > 21;
        },
        // Has the player won (true or false).
        playerWon: (game) => {

        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            return getHandSum(game.state.cards);
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            // TODO
        },
        getTotal: (game) => {
            // TODO
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            // TODO
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            // TODO
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // TODO
            return game.state.cards.push(dealer.draw(game.state.deck));
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};
