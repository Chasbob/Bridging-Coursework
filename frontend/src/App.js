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
        <Switch>
          <Route exact path="/">
            <Nav />
            <Hero />
            <Index />
          </Route>
          <Route exact path="/manage">
            <Nav />
            <div className="main">
              <Admin />
            </div>
            <Footer />
          </Route>
          <Route path="/:postId">
            <Nav />
            <div className="main">
              <Post />
            </div>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </SWRConfig>
  )
}
