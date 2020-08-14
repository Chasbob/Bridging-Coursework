import React from "react"
import { useLocation } from "react-router-dom"

export default function Breadcrumb() {
  let location = useLocation()
  let path = location.pathname
  let parts =
    path === "/" ? (
      <li key={path}>
        <a href="#">{path}</a>
      </li>
    ) : (
      location.pathname.split("/").map(part => {
        return (
          <li key={part}>
            <a href="#">{part}</a>
          </li>
        )
      })
    )

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>{parts}</ul>
    </nav>
  )
}
