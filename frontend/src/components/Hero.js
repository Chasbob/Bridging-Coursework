import React from "react"
import Nav from "./Nav"

export default function Hero({ authenticated }) {
  return (
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-head">
        {/* <Nav authenticated={authenticated} /> */}
      </div>
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-size-1">Charlie de Freitas</h1>
          <h2 className="subtitle has-text-weight-light is-size-6 is-italic">
            Bridging Coursework
          </h2>
        </div>
      </div>
    </section>
  )
}
