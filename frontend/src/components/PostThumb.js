import React from "react"
import { Link } from "react-router-dom"

const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
})
export default function PostPreview({ post }) {
  return (
    <div className="my-6" key={post.id}>
      <div className="content">
        <Link to={`/post/${post.id}`}>
          <p className="title is-3 has-text-link is-capitalized">
            {post.title}
          </p>
        </Link>
        <p className="subtitle is-6">
          {formatter.format(new Date(post.published_date))}
        </p>
      </div>
      <div className="divider" />
    </div>
  )
}
