import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Helmet, HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href={process.env.PUBLIC_URL + "/favicon.ico"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1abc9c" />
        <meta name="description" content="Super high production blog" />
        <link
          rel="apple-touch-icon"
          href={process.env.PUBLIC_URL + "/logo192.png"}
        />
        <link rel="manifest" href={process.env.PUBLIC_URL + "/manifest.json"} />
        <title>Important Things</title>
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
