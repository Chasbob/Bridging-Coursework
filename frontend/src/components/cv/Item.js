import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "../../components/CodeBlock"

export default function Item({ item }) {
  return (
    <div className="tile is-child">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">{item.title}</p>
        </div>
        <div className="card-content">
          <ReactMarkdown
            className="text has-text-left is-family-primary"
            renderers={{ code: CodeBlock }}
          >
            {item.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
