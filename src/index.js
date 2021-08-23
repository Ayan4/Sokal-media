import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <AuthContextProvider> */}
        <App />
        {/* </AuthContextProvider> */}
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
