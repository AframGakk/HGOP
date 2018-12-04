const lucky21Constructer = require('../lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
    let game = lucky21Constructer();
    expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
    let game = lucky21Constructer();
    expect(game.state.cards.length).toEqual(2);
});