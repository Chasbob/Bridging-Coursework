import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Nav({ authenticated }) {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <nav className="navbar">
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
            <Link className="navbar-item is-tab" to="/">
              <span>Home</span>
            </Link>
            <Link className="navbar-item is-tab" to="/blog">
              <span>Blog</span>
            </Link>
            <Link className="navbar-item is-tab" to="/cv">
              <span>CV</span>
            </Link>
            {authenticated && (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Admin</div>
                <div className="navbar-dropdown">
                  <Link className="navbar-item" to="/admin/blog">
                    <span>Blog</span>
                  </Link>
                  <div className="navbar-divider" />
                  <Link className="navbar-item" to="/admin/cv">
                    <span>CV</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
