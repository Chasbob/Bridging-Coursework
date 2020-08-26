import React, { useState } from "react"
import "./App.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { SWRConfig } from "swr"

import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Index from "./pages/Index"
import Post from "./pages/Post"
import ManageBlog from "./pages/admin/ManageBlog"
import ManageCV from "./pages/admin/ManageCV"
import Blog from "./pages/Blog"
import CV from "./pages/CV"

export default function App() {
  const config = {}
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") !== null ? true : false
  )
  const manageBlog = () => {
    if (authenticated) {
      return <ManageBlog />
    } else {
      return <Redirect to="/" />
    }
  }
  const manageCV = () => {
    if (authenticated) {
      return <ManageCV />
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
            <Route exact path="/admin/blog">
              {manageBlog}
            </Route>
            <Route exact path="/admin/cv">
              {manageCV}
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
            <Route exact path="/cv">
              <CV />
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
