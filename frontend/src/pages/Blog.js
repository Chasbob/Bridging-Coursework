import React from "react"
import PostList from "../components/post/PostListing"
import useSWR from "swr"
import { get } from "../utils/fetcher"
import { Helmet } from "react-helmet-async"

export default function Blog() {
  const { data: posts } = useSWR("/api/blog/", get, {
    initialData: [],
    revalidateOnMount: true,
  })

  return (
    <section className="section">
      <Helmet>
        <title>Important Things - Blog</title>
      </Helmet>
      <div className="container">
        <PostList posts={posts} />
      </div>
    </section>
  )
}
