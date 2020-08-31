import React from "react"
import { Link } from "react-router-dom"

const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
})
export default function PostPreview({ post }) {
  return (
    <div id={`post-preview-${post.id}`} className="my-6" key={post.id}>
      <div className="content">
        <Link to={`/blog/${post.title.replace(/ /g, "-")}`}>
          <p className="is-family-sans-serif title is-4 has-text-link is-capitalized">
            {post.title}
          </p>
        </Link>
        <p className="is-font-primary is-6">
          {formatter.format(new Date(post.published_date))}
        </p>
      </div>
      <div className="divider" />
    </div>
  )
}
