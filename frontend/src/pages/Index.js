import React from "react"
import PostList from "../components/PostListing"
import useSWR from "swr"
import fetcher from "../utils/fetcher"

export default function Index() {
  const { data: posts } = useSWR("/api/blog", fetcher, {
    initialData: [],
    revalidateOnMount: true,
  })

  return (
    <section className="section">
      <div className="container">
        <PostList posts={posts} />
      </div>
    </section>
  )
}
