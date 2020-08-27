import React from "react"

export default function Item({ item }) {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">{item.title}</p>
      </div>
      <div className="card-content">{item.description}</div>
    </div>
  )
}