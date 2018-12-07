function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            let retVal = randomReturnValues[i++];
            return retVal;
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

test('dealer should shuffle cards and deck length should be 3', () => {
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
    expect(deck.length).toEqual(3);
});


// TODO: Finna betra test fyrir shuffle
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
    expect(deck.length).toEqual(3);
});

test('check the correct draw from dealer after shuffle', () => {
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
    let card = dealer.draw(deck);

    // Assert
    expect(card).toEqual('a');
});

test('deck should be empty after 3 draws', () => {
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
    let card = dealer.draw(deck);
    card = dealer.draw(deck);
    card = dealer.draw(deck);

    // Assert
    expect(deck).toEqual([]);
});
