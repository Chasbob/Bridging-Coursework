import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "../../components/CodeBlock"
import * as FA from "react-icons/fa"

export default function Item({ item }) {
  return (
    <div className="tile is-child">
      <div className="card">
        <header className="card-header">
          <div className="card-header-icon">
            <Icon tag={item.icon} />
          </div>
          <p className="card-header-title is-family-sans-serif">{item.title}</p>
          <div className="card-header-icon is-hidden-mobile">
            <p className="px-3 is-family-code">{item.location} </p>
            <FA.FaMapMarkerAlt />
          </div>
        </header>
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

function Icon({ tag }) {
  const Output = FA[tag]
  return <Output />
}
