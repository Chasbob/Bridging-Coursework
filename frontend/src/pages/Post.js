import React from "react"
import { useParams } from "react-router-dom"
import { get } from "../utils/fetcher"
import ReactMarkdown from "react-markdown"

import useSWR from "swr"

export default function Post() {
  let { postId } = useParams()
  const { data: post } = useSWR(`/api/blog/${postId}`, get, {
    revalidateOnMount: true,
  })
  if (!post) return "loading..."
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="title is-capitalized">{post.title}</h1>
          <ReactMarkdown className="text has-text-left">
            {post.text}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
