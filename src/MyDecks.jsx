import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
class UnconnectedMyDecks extends Component {
  constructor() {
    super();
    this.state = { mydecks: [] };
  }
  componentDidMount = () => {
    let body = new FormData();
    body.append("username", this.props.username);
    fetch("/my-decks", { method: "POST", body })
      .then(res => res.text())
      .then(responsebody => {
        let cardbody = JSON.parse(responsebody);
        let mydecks = cardbody.decks.map(deck => {
          return deck.deckname;
        });
        this.setState({ mydecks: mydecks });
        this.props.dispatch({
          type: "set-my-decks",
          mydecks: this.state.mydecks
        });
      });
  };
  clickHandler = deck => {
    this.props.dispatch({
      type: "choose-deck",
      currentdeck: deck
    });
  };

  render = () => {
    if (this.props.currentdeck !== "") {
      return (
        <div className="test">
          <div className="flex-link">
            {" "}
            Links to Each Deck:
            {this.state.mydecks.map(deck => {
              return (
                <div>
                  <Link
                    className="link"
                    to={"/deck/" + deck}
                    onClick={() => this.clickHandler(deck)}
                  >
                    {deck}
                  </Link>{" "}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="test">
        <div className="flex-link">
          {" "}
          Links to Each Deck:
          {this.props.mydecks.map(deck => {
            return (
              <div>
                <div className="link-to-deck">
                  {" "}
                  <Link
                    className="link"
                    to={"/deck/" + deck}
                    onClick={() => this.clickHandler(deck)}
                  >
                    {deck}
                  </Link>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    mydecks: state.mydecks,
    currentdeck: state.currentdeck,
    state
  };
};
let MyDecks = connect(mapStateToProps)(UnconnectedMyDecks);
export default withRouter(MyDecks);
