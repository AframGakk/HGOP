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
    let newDealer = require('../dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

//// TODO:
//Create at least 2 unit tests for dealer.js - shuffle.
test('', () => {
    // Arrange
    let dependencies = {
        'random': newRandom([2, 1]),
    };
    let newDealer = require('../dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

//Create at least 2 unit tests for dealer.js - draw.
//Create at least 1 unit tests for deck.js.
//Create at least 3 unit tests for random.js.
