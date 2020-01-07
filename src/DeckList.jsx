import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout.jsx";
class UnconnectedDecklist extends Component {
  constructor() {
    super();
    this.state = {
      mycards: [],
      allcards: [],
      mycardsfull: []
    };
  }
  componentDidMount = async () => {
    let data = new FormData();
    data.append("username", this.props.state.username);
    data.append("deckname", this.props.state.currentdeck);
    console.log(this.props.state.username);
    console.log(this.props.state.currentdeck);
    let res = await fetch("/retrieve-decklist", {
      method: "POST",
      body: data
    });
    let b = await res.text();
    console.log(b);
    b = JSON.parse(b);
    console.log(b);
    this.setState({ mycards: b.card[0].cards });
    console.log(this.state); // above = fetch mycards
    let response = await fetch("/all-cards");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ allcards: body });
    console.log(this.state.mycards);
    console.log(this.state.allcards.cards[0].cardId);
    let mycardsfull = [];
    let pushcards = this.state.allcards.cards.filter(card => {
      let i = 0;
      for (i = 0; i < this.state.mycards.length; i++) {
        if (card.cardId === this.state.mycards[i]) {
          mycardsfull.push(card);
        }
      }
      return;
    });
    this.setState({ mycardsfull });
    this.setState({ loading: false });
    console.log(this.state);
  };
  render = () => {
    return (
      <div>
        <div className="navbar-mini">
          <div className="navbar-title">
            <Link to="/" className="link-store">
              Black Lotus
            </Link>
          </div>
          {/* <div className="current-deck">
            Currently selected Deck: {this.props.currentdeck}
          </div> */}
          <div className="navbar-right">
            <Link className="link" to="/MyCollection">
              My Collection
            </Link>
            <div></div>
            <div className="nav-pad">
              <Logout />
            </div>
          </div>
        </div>
        <div className="Display Deck Title">{this.props.currentdeck}</div>
        <div className="my-collection">
          {this.state.mycardsfull.map(card => {
            return (
              <div>
                <Link to={"/CardDetails/" + card.cardId}>
                  <img src={card.img} height="300px" />
                </Link>{" "}
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

let DeckList = connect(mapStateToProps)(UnconnectedDecklist);

export default DeckList;
