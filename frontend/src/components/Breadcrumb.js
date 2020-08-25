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

  parts.push(path.split("/").filter(part => part !== "").map((part, index) => {
      if (index !== path.split("/").filter(part => part !== "").length - 1) {
        return (
          <li key={part}>
            <Link
              to={path
                .split("/")
                .slice(0, index + 2)
                .join("/")}
            >
              {part}
            </Link>
          </li>
        )
      } else {
        return (
          <li key={part}>
            <span className="mx-2">{part}</span>
          </li>
        )
      }
  }))

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
