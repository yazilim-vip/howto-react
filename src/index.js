import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore from "./redux/configureStore";

const store = configureStore();

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
