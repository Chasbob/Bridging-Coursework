import React from "react"
import useSWR from "swr"

import Post from "./Post"

const fetcher = url => fetch(url).then(r => r.json())

export default function PostList() {
  const { data: posts } = useSWR("/api/blog", fetcher,
    {
      initialData: [
        {
          "id": 1,
          "title": "title",
          "author": "me",
          "text": "text"
        }
      ],
      revalidateOnMount: true,
    }
  )

  const postsView = posts.map(post => {
    return (
      <Post
      key={post.id}
      post={post}
      />
    )
  })
  return <div className="container">{postsView}</div>
}
