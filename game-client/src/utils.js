import axios from "axios";
// api Url
const apiUrl = window.location.href.replace(':4000/',':3000');

export const startGame = () => {
  // Call start game
  return axios.post(`${apiUrl}/start`).then(res => {
    return getState();
  });
};

export const getState = () => {
  // Get the state of the game
  return axios.get(`${apiUrl}/state`);
};

export const guessOver21 = () => {
  // Guess over 21
  return axios.post(`${apiUrl}/guessOver21`);
};

export const guess21OrUnder = () => {
  // Guess 21 or under
  return axios.post(`${apiUrl}/guess21OrUnder`);
};

// Helper function to convert cards format
export const convertCardNamesForSvg = cards => {
  return cards.map(card => {
    card = card.toLowerCase();
    if (card[0] === "1") {
      switch (card[1]) {
        case "1":
          return `J${card[2]}`;
        case "2":
          return `Q${card[2]}`;
        case "3":
          return `K${card[2]}`;
        default:
          return card;
      }
    } else {
      if (card[1] === "1") {
        return `A${card[2]}`;
      } else {
        return card.slice(1);
      }
    }
  });
};
