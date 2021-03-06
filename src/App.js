import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let highScore = 0;
let clickMessage =
  "Click on a character to gain points! Don't Click on the same one twice!!";

class App extends Component {
  // Setting this.state.matches to the matches json array
  state = {
    matches,
    correctGuesses,
    highScore,
    clickMessage
  };

  setClicked = id => {
    // Make a copy of the state matches array to work with
    const matches = this.state.matches;

    // Filter for the clicked match
    const clickedMatch = matches.filter(match => match.id === id);

    // If the matched image's clicked value is already true,
    // do the game over actions
    if (clickedMatch[0].clicked) {
      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + highScore);

      correctGuesses = 0;
      clickMessage = "Bummer! You already clicked on this one.";

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ matches });

      // Otherwise, if clicked = false, and the user hasn't finished
    } else if (correctGuesses < 11) {
      // Set its value to true
      clickedMatch[0].clicked = true;

      // increment the appropriate counter
      correctGuesses++;

      clickMessage = "Keep going!";

      if (correctGuesses > highScore) {
        highScore = correctGuesses;
        this.setState({ highScore });
      }

      // Shuffle the array to be rendered in a random order
      matches.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.matches equal to the new matches array
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {
      // Set its value to true
      clickedMatch[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // Egg on the user to play again
      clickMessage =
        "NO WAY!!! You got ALL of them!!! Now, Bet you can't do it again!";
      highScore = 12;
      this.setState({ highScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      matches.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.matches equal to the new matches array
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="container">
          <div className="row nav">
            <div className="col-4">
              <Title>Clicky-Game!</Title>
            </div>
            <div className="col-4 message">{this.state.clickMessage}</div>
            <div className="col-4 score">
              Correct Guesses: {this.state.correctGuesses}
              <br></br>
              High Score: {this.state.highScore}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.state.matches.map(match => (
              <MatchCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
