import React from "react"
import Social from "../components/Social"
export default function Index() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <p>Some bits about me.</p>
          </div>
          <div className="column">
            <Social />
          </div>
        </div>
      </div>
    </section>
  )
}
