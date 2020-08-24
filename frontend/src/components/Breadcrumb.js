import React from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

import { FaHome } from "react-icons/fa"

export default function Breadcrumb() {
  let location = useLocation()
  let path = location.pathname
  let parts = []
  parts.push(
    <li key="root">
      <Link to="/">
        <span className="icon">
          <FaHome />
        </span>
        <span>Home</span>
      </Link>
    </li>
  )

  path.split("/").map((part, index) => {
    if (part !== "") {
      if (index !== path.split("/").length - 1) {
        parts.push(
          <li key={part}>
            <Link
              to={path
                .split("/")
                .slice(0, index + 1)
                .join("/")}
            >
              {part}
            </Link>
          </li>
        )
      } else {
        parts.push(
          <li key={part}>
            <span className="mx-2">{part}</span>
          </li>
        )
      }
    } else {
      return ""
    }
  })

  if (parts.length > 1) {
    return (
      <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>{parts}</ul>
      </nav>
    )
  } else {
    return <div></div>
  }
}
