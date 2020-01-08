import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./Homepage.jsx";
import MyProfile from "./MyProfile.jsx";
import CardDetails from "./CardDetails.jsx";
import DeckList from "./DeckList.jsx";
import "./main.css";
class UnconnectedApp extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <div className="background-image"></div>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/Signup" component={Signup} />
          <Route exact={true} path="/Login" component={Login} />
          <Route exact={true} path="/MyCollection" component={MyProfile} />
          <Route
            exact={true}
            path="/Deck/:deckid"
            render={routerData => (
              <DeckList deckId={routerData.match.params.deckId} />
            )}
          />
          <Route
            exact={true}
            path="/CardDetails/:cardId"
            render={routerData => (
              <CardDetails cardId={routerData.match.params.cardId} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
