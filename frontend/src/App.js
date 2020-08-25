import React, { useState } from "react"
import "./App.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { SWRConfig } from "swr"
import { useCookies } from "react-cookie"

import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Index from "./pages/Index"
import Post from "./pages/Post"
import Admin from "./pages/Admin"
import Blog from "./pages/Blog"

export default function App() {
  const config = {}
  const [cookies] = useCookies(["access"])
  const [authenticated, setAuthenticated] = useState(
    cookies.access !== undefined ? true : false
  )
  const manage = () => {
    if (authenticated) {
      return <Admin />
    } else {
      return <Redirect to="/" />
    }
  }
  return (
    <SWRConfig value={config}>
      <Router>
        <div className="main">
          <Nav authenticated={authenticated} />
          <Switch>
            <Route exact path="/">
              <Hero />
              <Index />
            </Route>
            <Route exact path="/manage">
              {manage}
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
            <Route exact path="/blog/:postId">
              <Post />
            </Route>
          </Switch>
        </div>
        <Footer
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Router>
    </SWRConfig>
  )
}
