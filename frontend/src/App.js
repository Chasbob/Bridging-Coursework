import React from "react"
import "./App.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { SWRConfig } from "swr"

import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Index from "./pages/Index"
import Post from "./pages/Post"
import Admin from "./pages/Admin"

export default function App() {
  const config = {}
  return (
    <SWRConfig value={config}>
      <Router>
        <div className="main">
          <Switch>
            <Route exact path="/">
              <Nav />
              <Hero />
              <Index />
            </Route>
            <Route exact path="/manage">
              <Nav />
              <Admin />
            </Route>
            <Route path="/:postId">
              <Nav />
              <Post />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </SWRConfig>
  )
}
