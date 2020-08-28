import React from "react"
import "./App.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import useSWR, { SWRConfig } from "swr"
import { Helmet } from "react-helmet-async"

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
  const { data: authenticated } = useSWR(
    "authenticated",
    () => (localStorage.getItem("token") !== null ? true : false),
    {
      initialData: "",
      revalidateOnMount: true,
    }
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
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href={process.env.PUBLIC_URL + "/favicon.ico"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1abc9c" />
        <meta name="description" content="Super high production blog" />
        <link
          rel="apple-touch-icon"
          href={process.env.PUBLIC_URL + "/logo192.png"}
        />
        <link rel="manifest" href={process.env.PUBLIC_URL + "/manifest.json"} />
        <title>Important Things</title>
      </Helmet>
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
        <Footer />
      </Router>
    </SWRConfig>
  )
}
