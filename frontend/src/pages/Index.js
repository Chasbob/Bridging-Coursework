import React from "react"
import Social from "../components/Social"
export default function Index() {
  return (
    <section className="section">
      <div className="container">
        <div className="card is-medium">
          <div className="card-content">
            <div className="content">
              <p className="title is-4 is-family-code is-inline">$ whoami</p>
              <p className="is-family-primary">
                I am so smart that sometimes know what I'm doing 🥳
              </p>
              <Social />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
