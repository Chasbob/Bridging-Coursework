import React from "react"

import PostPreview from "./PostThumb"

export default function PostList({ posts }) {
  const postsView = posts.map(post => {
    return <PostPreview key={post.id} post={post} />
  })
  return <div className="container py-4 px-4">{postsView}</div>
}
