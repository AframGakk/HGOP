function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            return randomReturnValues[i++];
        }
    };
}

test('dealer should should shuffle cards', () => {
    // Arrange
    let dependencies = {
        'random': newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});
