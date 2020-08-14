import React from "react"
import "./App.scss"
import { BrowserRouter as Router } from "react-router-dom"
import { SWRConfig } from "swr"

import Nav from "./components/Nav"
import PostList from "./components/PostListing"

export default function App() {
  const config = {}
  return (
    <SWRConfig value={config}>
      <Router>
        <Nav />
        <PostList/>
      </Router>
    </SWRConfig>
  )
}
