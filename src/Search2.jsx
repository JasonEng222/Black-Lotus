import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmc: "",
      colorIdentity: [],
      colors: [],
      id: "",
      img: "",
      name: "",
      oracleText: "",
      price: "",
      priceF: "",
      search: ""
    };
  }
  addDeck = () => {
    let body = new FormData();
    body.append("username", this.props.username);
    body.append("id", this.state.id);
    body.append("coloridentity", this.state.colorIdentity);
    body.append("colors", this.state.colors);
    body.append("img", this.state.img);
    body.append("name", this.state.name);
    body.append("oracletext", this.state.oracleText);
    body.append("price", this.state.price);
    body.append("pricef", this.state.priceF);
    console.log(body);
    console.log(this.state);
    fetch("/add-card-to-decklist", { method: "POST", body });
  };
  clickHandler = () => {
    // if (
    //   fetch("https://api.scryfall.com/cards/named?fuzzy=" + this.state.search)
    //     .then(res => res.json())
    //     .then(json => {
    //       let searchResults = json.data;
    //       console.log(searchResults);
    //       let img = searchResults[0].image_uris.normal;
    //       let price = searchResults[0].prices.usd;
    //       let priceF = searchResults[0].prices.usd_foil;
    //       let oracleText = searchResults[0].oracle_text;
    //       let cmc = searchResults[0].cmc;
    //       let colorIdentity = searchResults[0].color_identity || colorless;
    //       let colors = searchResults[0].colors || colorless;
    //       console.log(searchResults[0].colors);
    //       let id = searchResults[0].id;

    //       this.setState({ img });
    //       this.setState({ price });
    //       this.setState({ priceF });
    //       this.setState({ oracleText });
    //       this.setState({ cmc });
    //       this.setState({ colorIdentity });
    //       this.setState({ colors });
    //       this.setState({ id });
    //     })
    // )
    {
      fetch("https://api.scryfall.com/cards/search?q=" + this.state.search)
        .then(res => res.json())
        .then(json => {
          let searchResults = json.data;
          console.log(searchResults);
          let img = searchResults[0].image_uris.normal;
          let price = searchResults[0].prices.usd;
          let priceF = searchResults[0].prices.usd_foil;
          let oracleText = searchResults[0].oracle_text;
          let cmc = searchResults[0].cmc;
          let colorIdentity = searchResults[0].color_identity;
          let colors = searchResults[0].colors;
          let id = searchResults[0].id;
          let name = searchResults[0].name;
          this.setState({ name });
          this.setState({ img });
          this.setState({ price });
          this.setState({ priceF });
          this.setState({ oracleText });
          this.setState({ cmc });
          this.setState({ colorIdentity });
          this.setState({ colors });
          this.setState({ id });
          console.log(this.state);
        });
    }
  };
  render = () => {
    // if (this.state.img === "") {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={event => {
            this.setState({ search: event.target.value });
          }}
        />
        <button onClick={this.clickHandler}>Search</button>
        <div />
        <img src={this.state.img} height="500px" />
        <div>Name: {this.state.name}</div>
        <div>Price:{this.state.price}$ USD</div>
        <div>
          Foil Price:
          {this.state.priceF === null
            ? "Unavailable"
            : this.state.priceF + "$ USD"}
        </div>
        <div>Description:{this.state.oracleText}</div>
        <div>CmC:{this.state.cmc}</div>
        <div>
          Color Identity:
          {this.state.colorIdentity.length === 0
            ? " Colorless"
            : this.state.colors}
        </div>
        <div>
          Colors:
          {this.state.colors.length === 0 ? " Colorless" : this.state.colors}
        </div>
        <button onClick={this.addDeck}>Add to deck</button>
      </div>
    );
    // }
    // return (
    //   <input
    //     type="text"
    //     value={this.state.search}
    //     onChange={event => {
    //       this.setState({ search: event.target.value });
    //     }}
    //   />
    // );
  };
}
let mapStateToProps = state => {
  return { username: state.username, state };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
