import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Nav() {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <nav className={`hero navbar is-primary is-bold`}>
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className="subtitle has-text-white">Blog</span>
          </Link>
          <button
            className={`navbar-burger is-not-button ${
              active ? "is-active" : ""
            }`}
            onClick={handleToggle}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${active ? "is-active" : ""}`}>
          <div className="navbar-start"></div>
          <div className="navbar-end">
            {/* <a className="navbar-item" href="/admin/">
                    Login
                </a> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
