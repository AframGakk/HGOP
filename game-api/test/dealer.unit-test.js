// dealer.unit-test.js
const dealerConstructor = require('./dealer.js');

test('dealer should should shuffle cards', () => {
    // Arrange
    let deck = ['a', 'b', 'c'];
    let dealer = dealerConstructor();

    // Act
    // Expected Shuffle
    // ['a', 'b', 'c'] Initial
    // ['c', 'b', 'a'] Switch index 0 and 2
    // ['c', 'a', 'b'] Switch index 1 and 2
    dealer.shuffle(deck, () => {
        return 0.99;
    });

    // Assert
    expect(deck).toEqual(['c', 'a', 'b']);
});
