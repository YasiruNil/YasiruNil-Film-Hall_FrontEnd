import App from "./App"
import React from "react"
import store from "./store"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import history from "./utility/history"
import { Router } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
