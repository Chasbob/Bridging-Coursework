import React from "react"
import { useParams } from "react-router-dom"
import { get } from "../utils/fetcher"
import ReactMarkdown from "react-markdown"

import useSWR from "swr"

export default function Post() {
  let { postId } = useParams()
  const { data: post } = useSWR(
    `/api/blog/${postId.replace("/ /g", "-")}/`,
    get,
    {
      revalidateOnMount: true,
    }
  )
  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <div className="level-item">
              <button className="button is-large is-loading " />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="title is-family-sans-serif is-capitalized">
            {post.title}
          </h1>
          <ReactMarkdown className="text has-text-left is-family-primary">
            {post.text}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
