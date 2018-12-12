import Deck from "react-poker";
import "../../node_modules/react-poker/dist/styles.css";

import React from "react";
import {
  startGame,
  getState,
  guess21OrUnder,
  guessOver21,
  convertCardNamesForSvg
} from "../utils";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      total: 0,
      cardsValue: 0,
      cardValue: 0,
      gameOver: false,
      winner: false
    };
    this.setGameResponseToState = this.setGameResponseToState.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.guess21OrUnder = this.guess21OrUnder.bind(this);
    this.guessOver21 = this.guessOver21.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    this.getGameState();
  }

  setGameResponseToState(gameResponse) {
    const convertedGameState = convertCardNamesForSvg(
      [...gameResponse.cards, gameResponse.card].filter(
        val => val !== undefined
      )
    );
    this.setState({
      board: convertedGameState,
      total: gameResponse.total,
      cardsValue: gameResponse.cardsValue,
      cardValue: gameResponse.cardValue,
      gameOver: gameResponse.gameOver,
      winner: gameResponse.playerWon
    });
  }

  getGameState() {
    getState().then(gameResponse => {
      if (gameResponse.status === 204) {
        // No game has been played
        this.newGame();
      }
      this.setGameResponseToState(gameResponse.data);
    });
  }

  guess21OrUnder() {
    guess21OrUnder().then(gameResponse => {
      this.setGameResponseToState(gameResponse.data);
    });
  }

  guessOver21() {
    guessOver21().then(gameResponse => {
      this.setGameResponseToState(gameResponse.data);
    });
  }

  newGame() {
    // Note, the Deck does not rerender after this call, we need to refresh the page
    startGame().then(gameResponse => {
      this.setGameResponseToState(gameResponse.data);
    });
  }

  render() {
    const { board } = this.state;
    return (
      <div style={{ marginLeft: "10vw", marginTop: "10vh" }}>
        <div>
          <div>Total: {this.state.total}</div>
          <div>Cards Value: {this.state.cardsValue}</div>
          <div>Card Value: {this.state.cardValue}</div>
          {this.state.gameOver ? (
            <div>
              {this.state.winner
                ? "Winner, Winner, Chicken Dinner!"
                : "Sorry, you lost!"}
            </div>
          ) : null}
        </div>
        {this.state.gameOver ? (
          <button
            style={{ padding: "1.5em", margin: "2em" }}
            onClick={this.newGame}
          >
            New Game
          </button>
        ) : (
          <div>
            <button
              style={{ padding: "1.5em", margin: "2em" }}
              onClick={this.guess21OrUnder}
            >
              Guess 21 Or Under
            </button>
            <button
              style={{ padding: "1.5em", margin: "2em" }}
              onClick={this.guessOver21}
            >
              Guess Over 21
            </button>
          </div>
        )}

        <Deck
          board={board}
          boardXoffset={200} // X axis pixel offset for dealing board
          boardYoffset={150} // Y axis pixel offset for dealing board
          size={150} // card height in pixels
        />
      </div>
    );
  }
}

export default AppContainer;
