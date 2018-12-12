//copied lucky21 from solutions, our had some kind of logic problem
module.exports = (context) => {
    const deckConstructor = context('deck');
    const deck = deckConstructor(context);
    const dealerConstructor = context('dealer');
    const dealer = dealerConstructor(context);

    dealer.shuffle(deck);
    const card0 = dealer.draw(deck);
    const card1 = dealer.draw(deck);

    return {
        state: {
            deck: deck,
            dealer: dealer,
            cards: [card0, card1],
            card: undefined,
        },
        isGameOver: (game) => {
            return game.state.card !== undefined
            || game.getTotal(game) >= 21;
        },
        playerWon: (game) => {
            return (game.state.card !== undefined && game.getTotal(game) > 21)
            || game.getCardsValue(game) == 21;
        },
        getCardsValue: (game) => {
            let cardsValue = 0;

            // count everything and treat all aces as 1.
            for (let i = 0; i < game.state.cards.length; i++) {
                const cardValue = parseInt(game.state.cards[i].substring(0, 2));
                cardsValue += Math.min(cardValue, 10);
            }

            // foreach ace check if we can add 10.
            for (let i = 0; i < game.state.cards.length; i++) {
                const cardValue = parseInt(game.state.cards[i].substring(0, 2));
                if (cardValue == 1) {
                    if (cardsValue + 10 <= 21) {
                        cardsValue += 10;
                    }
                }
            }

            return cardsValue;
        },
        getCardValue: (game) => {
            const card = game.state.card;
            if (card === undefined) return card;

            const cardValue = parseInt(card.substring(0, 2));
            return Math.min(cardValue, 10);
        },
        getTotal: (game) => {
            return game.getCardsValue(game) + (game.getCardValue(game) || 0);
        },
        getCards: (game) => game.state.cards,
        getCard: (game) => game.state.card,
        guess21OrUnder: (game) => {
            const nextCard = dealer.draw(game.state.deck);
            game.state.cards.push(nextCard);
        },
        guessOver21: (game) => {
            const nextCard = dealer.draw(game.state.deck);
            game.state.card = nextCard;
        },
        getState: (game) => {
            return {
                cards: game.state.cards,
                cardsValue: game.getCardsValue(game),
                card: game.state.card,
                cardValue: game.getCardValue(game),
                total: game.getTotal(game),
                gameOver: game.isGameOver(game),
            };
        },
    };
};