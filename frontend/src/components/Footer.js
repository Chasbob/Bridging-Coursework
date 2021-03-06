import React from "react"

import Breadcrumb from "./Breadcrumb"
import Login from "./Login"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <Breadcrumb />
          </div>
          <div className="level-right">
            <Login />
          </div>
        </div>
      </div>
    </footer>
  )
}
