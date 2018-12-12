import axios from "axios";
// TODO: Add correct api Url
const apiUrl = "";

export const startGame = () => {
  // TODO: Call start game
  return axios.post(`${apiUrl}`).then(res => {
    return getState();
  });
};

export const getState = () => {
  // TODO: Get the state of the game
  return axios.get(`${apiUrl}`);
};

export const guessOver21 = () => {
  // TODO: Guess over 21
  return axios.post(`${apiUrl}`);
};

export const guess21OrUnder = () => {
  // TODO: Guess 21 or under
  return axios.post(`${apiUrl}`);
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
