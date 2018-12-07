
test('the deck object should not be undefined', () => {
    // Arrange
    let deckObject = require("../deck.js");
    let deck = deckObject();

    // Assert
    expect(deck).not.toBeUndefined();
});

test('the deck should have the length of 52 cards in an array', () => {
    // Arrange
    let deckObject = require("../deck.js");
    let deck = deckObject();

    // Assert
    expect(deck.length).toBe(52);

});