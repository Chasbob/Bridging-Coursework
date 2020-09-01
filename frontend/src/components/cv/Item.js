import React from "react"
import ReactMarkdown from "react-markdown"
import { FaMapMarkerAlt } from "react-icons/fa"

export default function Item({ item }) {
  return (
    <div className="card my-4">
      <header className="card-header">
        <div className="card-header-icon">
          <FaMapMarkerAlt />
        </div>
        <p className="card-header-title is-family-sans-serif pl-0">
          {item.title}
        </p>
        <div className="card-header-icon is-hidden-mobile">
          <p className="px-3 is-family-code">{item.location} </p>
          <FaMapMarkerAlt />
        </div>
      </header>
      <div className="card-content content">
        <ReactMarkdown
          className="text has-text-left is-family-primary"
          source={item.description}
        />
      </div>

      {item.link !== "" && (
        <div className="card-footer">
          <a className="has-text pl-2 card-footer-item" href={item.link}>
            <span>{item.link}</span>
          </a>
        </div>
      )}
    </div>
  )
}
