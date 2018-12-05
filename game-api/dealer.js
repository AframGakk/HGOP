module.exports = () => {
  return {
    shuffle: (deck) => {
      for (let i = 0; i < deck.length - 1; i++) {
        const j = Math.floor(Math.random() * (deck.length - i)) + i;
        const card = deck[j];
        const old = deck[i];
        deck[i] = card;
        deck[j] = old;
      }
    },
    draw: (deck) => {
      const card = deck.pop();
      return card;
    },
  };
};
