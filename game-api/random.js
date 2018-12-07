module.exports = function(context) {
    return {
        randomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
    };
};
