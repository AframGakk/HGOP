module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);

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

    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: 22 - (calcCard(card0) + calcCard(card1)),
    };

    let getHandSum = () => {
        let sum = 0;
        state.cards.forEach((item) => {
            sum += calcCard(item);
        });
        return sum;
    };

    let updateExceedingCard = (cards) => {
        let card = 22 - getHandSum(cards);

        if (card < 0) {
            return undefined;
        } else {
            return card;
        }
    };


    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            return getHandSum() > 21;
        },
        // Has the player won (true or false).
        playerWon: (game) => {

        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            return getHandSum();
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            return game.state.card;
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
            game.state.cards.push(dealer.draw(game.state.deck));
            updateExceedingCard();
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};
