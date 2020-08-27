import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism/"

export default function CodeBlock({ value, language }) {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      showInlineLineNumbers={true}
      language={language}
      style={materialOceanic}
    >
      {value}
    </SyntaxHighlighter>
  )
}
