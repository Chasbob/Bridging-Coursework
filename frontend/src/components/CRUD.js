import React, { useState } from "react"
import { Dropdown, DropdownItem } from "./Dropdown"
import { Link } from "react-router-dom"
import { remove } from "../utils/fetcher"
import { mutate } from "swr"
import { useCookies } from "react-cookie"
import PostModal from "./PostModal"
import Truncate from "react-truncate"
import { put } from "../utils/fetcher"

export default function CRUD({ post }) {
  const [cookies] = useCookies(["access_token"])
  const [modalActive, setModalActive] = useState(false)
  let controls = (
    <div className="card-footer">
      <Link className="card-footer-item" to={`/${post.id}`}>
        View
      </Link>
      <a className="card-footer-item" onClick={() => setModalActive(true)}>
        Edit
      </a>
    </div>
  )

  const handleDelete = async () => {
    await remove(`/api/blog/${post.id}/`, cookies["access_token"])
    mutate("/api/blog/")
  }

  const handleModalSubmit = async form => {
    if (form.author === 0) {
      form.author = parseInt(cookies["user"]["pk"])
    }
    await put(`/api/blog/${post.id}`, form, cookies["access_token"]).catch(e =>
      console.error(e)
    )
    mutate("/api/blog/")
    setModalActive(false)
  }

  return (
    <div className="grid-item">
      {modalActive && (
        <PostModal
          data={post}
          onClose={() => setModalActive(false)}
          onSubmit={handleModalSubmit}
        />
      )}

      <div className="card">
        <div className="card-header">
          <p className="card-header-title">
            <Truncate lines={1} ellipsis={<span>...</span>}>
              {post.title}
            </Truncate>
          </p>
          <div className="card-header-icon">
            <Dropdown right={true}>
              <DropdownItem onClick={handleDelete}>Delete</DropdownItem>
            </Dropdown>
          </div>
        </div>
        {controls}
      </div>
    </div>
  )
}
