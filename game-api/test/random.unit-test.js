
test('the random number should be less then the max', () => {
    // Arrangw
    let impRandom = require('../random.js');
    let random = impRandom();
    //random.randomInt = newRandom();

    // Act
    let randInt = random.randomInt(100, 1);

    // Assert
    expect(randInt).toBeLessThanOrEqual(100);
});

test('the random number should be less then the max', () => {
    // Arrangw
    let impRandom = require('../random.js');
    let random = impRandom();
    //random.randomInt = newRandom();

    // Act
    let randInt = random.randomInt(100, 1);

    // Assert
    expect(randInt).toBeGreaterThanOrEqual(1);
});

test('should return random value 5 with mock function', () => {
    // Arrangw
    let impRandom = require('../random.js');
    let random = impRandom();
    random.randomInt = () => {
        return 5;
    };

    // Act
    let randInt = random.randomInt(100, 1);

    // Assert
    expect(randInt).toEqual(5);
});


