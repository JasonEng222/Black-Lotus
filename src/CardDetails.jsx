import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Logout from "./Logout.jsx";

class UnconnectedCardDetails extends Component {
  constructor() {
    super();
    this.state = {
      cardinfo: [],
      allcards: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-cards");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ allcards: body });
    console.log(this.state.mycards);
    console.log(this);
    let cardinfo = this.state.allcards.cards.filter(card => {
      return card.cardId === this.props.cardId;
    });
    console.log(cardinfo);
    this.setState({ cardinfo });
  };
  addToDeckList = async card => {
    console.log(card);
    let data = new FormData();
    data.append("username", this.props.state.username);
    data.append("deckname", this.props.state.currentdeck);
    data.append("cardId", card.cardId);
    let res = await fetch("/add-card-to-decklist", {
      method: "POST",
      body: data
    });
  };
  clickHandler = deck => {
    console.log(deck);
    this.props.dispatch({
      type: "choose-deck",
      currentdeck: deck
    });
  };
  render = () => {
    if (this.state.cardinfo.length === 0) {
      return "";
    }
    let cardinfo = this.state.cardinfo[0];
    if (this.props.currentdeck !== "") {
      return (
        <div>
          <div className="navbar-mini">
            <div className="navbar-title">
              <Link to="/" className="link-store">
                Black Lotus
              </Link>
            </div>
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
          <div className="card-detes">
            <div className="display-card-img">
              <img src={cardinfo.img} height="300px" />{" "}
            </div>
            <div className="display-card-info">
              <div className="center-card-info">
                <div>Name: {cardinfo.name}</div>
                <div>
                  Price:
                  {cardinfo.price === null
                    ? " Currently Unavailable"
                    : cardinfo.price + "$ USD"}
                </div>
                <div>
                  Foil Price:
                  {cardinfo.priceF === null
                    ? " Currently Unavailable"
                    : cardinfo.priceF + "$ USD"}
                </div>
                <div>Description:{cardinfo.oracleText}</div>
                <div>CmC:{cardinfo.cmc}</div>
                <div>
                  Color Identity:
                  {cardinfo.colorIdentity.length === 0
                    ? " Colorless"
                    : cardinfo.colors}
                </div>
                <div>
                  Colors:
                  {cardinfo.colors.length === 0
                    ? " Colorless"
                    : cardinfo.colors}
                </div>
                <a href={cardinfo.affiliate}>Purchase from our affiliate </a>
                <div></div>
              </div>
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
            <Link className="link" to="/MyCollection">
              My Collection
            </Link>
            <div></div>
            <div className="nav-pad">
              <Logout />
            </div>
          </div>
        </div>
        <div className="center-items">
          <div className="display-card-img">
            <img src={cardinfo.img} height="350px" />{" "}
          </div>
          <div className="display-card-info">
            <div className="center-card-info">
              <div>Name: {cardinfo.name}</div>
              <div>
                Price:
                {cardinfo.price === null
                  ? " Currently Unavailable"
                  : cardinfo.price + "$ USD"}
              </div>
              <div>
                Foil Price:
                {cardinfo.priceF === null
                  ? " Currently Unavailable"
                  : cardinfo.priceF + "$ USD"}
              </div>
              <div>Description:{cardinfo.oracleText}</div>
              <div>CmC:{cardinfo.cmc}</div>
              <div>
                Color Identity:
                {cardinfo.colorIdentity.length === 0
                  ? " Colorless"
                  : cardinfo.colors}
              </div>
              <div>
                Colors:
                {cardinfo.colors.length === 0 ? " Colorless" : cardinfo.colors}
              </div>
              <a href={cardinfo.affiliate}>Purchase from our affiliate </a>
              <div></div>
            </div>
          </div>
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
let CardDetails = connect(mapStateToProps)(UnconnectedCardDetails);
export default CardDetails;
