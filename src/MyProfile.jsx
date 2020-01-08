import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout.jsx";
import "./main.css";
import MyDecks from "./MyDecks.jsx";
class UnconnectedProfile extends Component {
  constructor() {
    super();
    this.state = {
      mycards: [],
      allcards: [],
      mycardsfull: [],
      loading: "true",
      newdeckname: ""
    };
  }
  componentDidMount = async () => {
    let data = new FormData();
    data.append("user", this.props.state.username);
    let res = await fetch("/my-cards", {
      method: "POST",
      body: data
    });
    let b = await res.text();
    b = JSON.parse(b);
    this.setState({ mycards: b.collection }); //above = fetch mycards
    let response = await fetch("/all-cards");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ allcards: body });
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
    this.props.dispatch({
      type: "choose-deck",
      currentdeck: this.props.mydecks[0]
    });
  };
  addToDeckList = async card => {
    let data = new FormData();
    data.append("username", this.props.state.username);
    data.append("deckname", this.props.state.currentdeck);
    data.append("cardId", card.cardId);
    let res = await fetch("/add-card-to-decklist", {
      method: "POST",
      body: data
    });
  };
  clickHandler = event => {
    this.props.dispatch({
      type: "choose-deck",
      currentdeck: event
    });
  };
  addNewDeck = event => {
    event.preventDefault();
    let body = new FormData();
    body.append("username", this.props.username);
    body.append("deckname", this.state.newdeckname);
    fetch("/new-deck", { method: "POST", body });
    this.props.dispatch({
      type: "choose-new-deck",
      newdeckname: this.state.newdeckname
    });
    this.props.dispatch({
      type: "add-deck-to-store",
      mydecks: this.state.newdeckname
    });
  };
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  render() {
    if (this.state.loading === true) {
      return "loading";
    }
    if (this.props.currentdeck !== "") {
      return (
        <div>
          <div className="navbar-mini">
            <div className="navbar-title">
              <Link to="/" className="link-store">
                Black Lotus
              </Link>
            </div>
            <div>Deck List: </div>
            <select onChange={event => this.clickHandler(event.target.value)}>
              {this.props.mydecks.map(deck => {
                return <option value={deck}>{deck}</option>;
              })}
            </select>
            <div className="navbar-right">
              <div></div>
              <div className="nav-pad">
                <Logout />
              </div>
            </div>
          </div>
          <MyDecks />
          <div>
            <input
              type="text"
              placeholder="Add New Deck"
              value={this.state.newdeckname}
              onChange={event => {
                console.log(event.target.value);
                this.setState({ newdeckname: event.target.value });
              }}
            ></input>
            <button onClick={this.addNewDeck}>Submit</button>
            <div></div>
            <div className="my-collection">
              {this.state.mycardsfull.map(card => {
                return (
                  <div>
                    <Link to={"/CardDetails/" + card.cardId}>
                      <img src={card.img} height="250px" />
                    </Link>{" "}
                    <button onClick={() => this.addToDeckList(card)}>
                      Add to decklist
                    </button>{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="navbar-mini">
          <div className="navbar-title">
            <Link to="/" className="link-store">
              Black Lotus
            </Link>
          </div>
          <div className="navbar-right">
            <div className="navbar-center"></div>
            <select onChange={event => this.clickHandler(event.target.value)}>
              {this.props.mydecks.map(deck => {
                return <option value={deck}>{deck}</option>;
              })}
            </select>
            <div></div>
            <div className="nav-pad">
              <Logout />
            </div>
          </div>
        </div>
        <MyDecks />
        <div>
          <input
            type="text"
            placeholder="Add New Deck"
            value={this.state.newdeckname}
            onChange={event => {
              console.log(event.target.value);
              this.setState({ newdeckname: event.target.value });
            }}
          ></input>
          <button onClick={this.addNewDeck}>Submit</button>
          <div></div>
          <div className="my-collection">
            {this.state.mycardsfull.map(card => {
              return (
                <div>
                  <Link to={"/CardDetails/" + card.cardId}>
                    <img src={card.img} height="300px" />
                  </Link>{" "}
                  <button onClick={() => this.addToDeckList(card)}>
                    Add to decklist
                  </button>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    username: state.username,
    currentdeck: state.currentdeck,
    mycards: state.mycards,
    mydecks: state.mydecks,
    state
  };
};
let MyProfile = connect(mapStateToProps)(UnconnectedProfile);
export default MyProfile;
