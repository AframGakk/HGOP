module.exports = (context) => {
    let deckConstructor = context("deck");
    let deck = deckConstructor(context);

    let dealerConstructor = context('dealer');
    let dealer = dealerConstructor(context);

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
        // The choice each time makes easier to run in state environment
        choice: undefined
    };

    // calculates the value of one card (checks sum for eval of an ace)
    let calcCard = (card, sum) => {
        let number = card.substring(0, 2);

        if(parseInt(number) < 10 && parseInt(number) > 1) {
            return parseInt(number);
        } else if (parseInt(number) == 1) {
            if ((sum + 11) > 20) {
                return 1;
            } else {
                return 11;
            }
        } else {
            return 10;
        }
    };

    // returns the sum of the hand
    let getHandSum = () => {
        let sum = 0;
        state.cards.forEach((item) => {
            sum += calcCard(item, sum);
        });
        return sum;
    };

    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            return getHandSum() > 21;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            if(game.state.choice == 0) {
                if(getHandSum() <= 21) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if(getHandSum() > 21) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let sum = getHandSum();

            if (sum >= 21) {
                return 0;
            }

            for (let i = 1; i < 11; i++) {
                if((sum + i) == 21) {
                    return 21;
                }
            }

            return (sum + 11);
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            let sum = getHandSum();
            if (sum >= 21) {
                return undefined;
            }

            for (let i = 1; i < 11; i++) {
                if((sum + i) == 22) {
                    return i;
                }
            }

            return 11;
        },
        getTotal: (game) => {
            return getHandSum();
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            let card = dealer.draw(game.state.deck);
            game.state.cards.push(card);
            game.state.card = card;
            game.state.choice = 0;
        },
        // Player action (void).
        guessOver21: (game) => {
            let card = dealer.draw(game.state.deck);
            game.state.cards.push(card);
            game.state.card = card;
            game.state.choice = 1;
        }
    };
};
