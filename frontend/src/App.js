import React from "react"
import "./App.scss"
import { BrowserRouter as Router } from "react-router-dom"

import Nav from "./components/Nav"

export default function App() {
  return (
    <Router>
      <Nav />
    </Router>
  )
}