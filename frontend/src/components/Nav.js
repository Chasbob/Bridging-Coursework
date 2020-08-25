import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Nav({authenticated}) {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <nav className="hero navbar is-medium is-primary is-bold">
      <div className="container">
        <div className="navbar-brand">
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
            <Link className="navbar-item" to="/">
              <span className="subtitle has-text-white">Home</span>
            </Link>
            <Link className="navbar-item" to="/blog">
              <span className="subtitle has-text-white">Blog</span>
            </Link>
            {authenticated && (
              <Link className="navbar-item" to="/manage">
              <span className="subtitle has-text-white">Manage</span>
            </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
