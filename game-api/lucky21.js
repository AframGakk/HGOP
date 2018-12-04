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
        choice: undefined
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
            return game.state.card;
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
            // TODO
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // TODO
            game.state.cards.push(dealer.draw(game.state.deck));
            game.state.choice = 0;
            updateExceedingCard();
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};
