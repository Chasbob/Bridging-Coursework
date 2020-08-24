import React from "react"
import Social from "../components/Social"
export default function Index() {
  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <p>Some bits about me.</p>
          </div>
          <div className="level-right">
            <Social />
          </div>
        </div>
      </div>
    </section>
  )
}
