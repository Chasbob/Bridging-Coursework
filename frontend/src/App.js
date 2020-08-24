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
import Blog from "./pages/Blog"

export default function App() {
  const config = {}
  return (
    <SWRConfig value={config}>
      <Router>
        <div className="main">
          <Nav />
          <Switch>
            <Route exact path="/">
              <Hero />
              <Index />
            </Route>
            <Route exact path="/manage">
              <Admin />
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
            <Route path="/:postId">
              <Post />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </SWRConfig>
  )
}
