import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import howtoReducer from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";

import { actionCreators } from "../src/redux/actions";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const store = createStore(howtoReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

WebFont.load({
  google: {
    families: ["Lato", "Ubuntu"],
  },
});
