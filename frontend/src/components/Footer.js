import React from "react"

import Breadcrumb from "./Breadcrumb"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="level">
          <div className="level-left">
      <Breadcrumb />
          </div>
          <div className="level-right">
          </div>
        </div>
      </div>
    </footer>
  )
}
