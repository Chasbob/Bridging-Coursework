import React, { Suspense, lazy } from "react"
import "./App.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import useSWR, { SWRConfig } from "swr"

const Nav = lazy(() => import("./components/Nav"))
const Hero = lazy(() => import("./components/Hero"))
const Footer = lazy(() => import("./components/Footer"))

const Index = lazy(() => import("./pages/Index"))
const Post = lazy(() => import("./pages/Post"))
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
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </Router>
    </SWRConfig>
  )
}
