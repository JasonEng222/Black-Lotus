import { createStore } from "redux";
let initialState = {
  loggedIn: false,
  username: "",
  mycards: [],
  currentdeck: "",
  mydecks: []
};
// let initialState = {
//   loggedIn: false,
//   username: "",
//   mycards: []
// };
let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, loggedIn: action.loggedIn };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, username: action.username };
  }
  if (action.type === "log-out") {
    return { ...state, loggedIn: false, username: "" };
  }
  if (action.type === "load-collection") {
    return { ...state, mycards: action.mycards };
  }
  if (action.type === "set-my-decks") {
    return { ...state, mydecks: action.mydecks };
  }
  if (action.type === "choose-deck") {
    return { ...state, currentdeck: action.currentdeck };
  }
  if (action.type === "choose-new-deck") {
    return { ...state, currentdeck: action.newdeckname };
  }
  if (action.type === "remove-from-collection") {
    return { ...state, mycards: action.collection };
  }
  if (action.type === "add-deck-to-store") {
    return { ...state, mydecks: state.mydecks.concat(action.newdeckname) };
  }
  return state;
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
