import React, { Suspense, lazy } from "react"
import "./App.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import useSWR, { SWRConfig } from "swr"

import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
// const Nav = lazy(() => import("./components/Nav"))
// const Hero = lazy(() => import("./components/Hero"))
// const Footer = lazy(() => import("./components/Footer"))

import Index from "./pages/Index"
import Post from "./pages/Post"

// const Index = lazy(() => import("./pages/Index"))
// const Post = lazy(() => import("./pages/Post"))
const CV = lazy(() => import("./pages/CV"))
const Blog = lazy(() => import("./pages/Blog"))

const ManageBlog = lazy(() => import("./pages/admin/ManageBlog"))
const ManageCV = lazy(() => import("./pages/admin/ManageCV"))

export default function App() {
  const config = {}
  const { data: authenticated } = useSWR(
    "authenticated",
    () => (localStorage.getItem("token") !== null ? true : false),
    {
      initialData: localStorage.getItem("token") !== null ? true : false,
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
      <Router>
        <div className="main">
          <Nav authenticated={authenticated} />
          <Switch>
            <Route exact path="/">
              <Hero />
              <Index />
            </Route>
            <Suspense fallback={<div>Loading...</div>}>
              <Suspense fallback={<div>loading admin...</div>}>
                <Route exact path="/admin/blog">
                  {manageBlog}
                </Route>
                <Route exact path="/admin/cv">
                  {manageCV}
                </Route>
              </Suspense>
              <Route exact path="/blog">
                <Suspense fallback={<div>loading blog...</div>}>
                  <Blog />
                </Suspense>
              </Route>
              <Route exact path="/cv">
                <Suspense fallback={<div>loading cv...</div>}>
                  <CV />
                </Suspense>
              </Route>
              <Route exact path="/blog/:postId">
                <Post />
              </Route>
            </Suspense>
          </Switch>
        </div>
        <Footer />
      </Router>
    </SWRConfig>
  )
}
