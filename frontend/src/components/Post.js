import React from "react"

export default function Post({ post }) {
  //   return (
  //     <div class="grid-item">
  //       <div class="container">
  //         <div class="content">
  //           <h1 class="is-large">{post.title}</h1>
  //           <p>{post.text}</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  return (
    <div className="grid-item" key={post.id}>
      <div className="card">
        <div className="card-content">
          <p className="title is-4">{post.title}</p>
          <p className="subtitle is-6">By {post.author}</p>
          <div className="content">{post.text}</div>
        </div>
      </div>
    </div>
  )
}
