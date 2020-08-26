import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { get, post } from "../../utils/fetcher"
import CRUD from "../../components/CRUD"
import PostModal from "../../components/post/PostModal"
import { FaPlusCircle } from "react-icons/fa"
import moment from "moment"

export default function ManageBlog() {
  const [authenticated] = useState(
    localStorage.getItem("token") !== null ? true : false
  )
  const [token] = useState(authenticated ? localStorage.getItem("token") : "")
  const [userId] = useState(
    authenticated ? JSON.parse(localStorage.getItem("user")).pk : ""
  )

  const { data: posts } = useSWR("/api/blog/", get, {
    initialData: [],
    revalidateOnMount: true,
  })
  const cruds = posts.map(item => {
    item.created_date = moment(new Date(item.created_date)).format("YYYY-MM-DD")
    item.published_date = moment(new Date(item.published_date)).format(
      "YYYY-MM-DD"
    )
    return <CRUD key={item.id} post={item} />
  })

  const [modalActive, setModalActive] = useState(false)
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handleModalSubmit = async form => {
    if (form.author === 0) {
      form.author = parseInt(userId)
    }
    await post("/api/blog/", form, token)
    mutate("/api/blog/")
    setModalActive(false)
  }
  return (
    <div>
      {modalActive && (
        <PostModal onSubmit={handleModalSubmit} onClose={handleModalClose} />
      )}
      <section className="section">
        <div className="container">
          <button
            className="button is-block is-primary is-outlined"
            onClick={handleModalOpen}
          >
            <span className="icon">
              <FaPlusCircle />
            </span>
            <span>New</span>
          </button>
          <br />
          <div key="things" className="grid">
            {cruds}
          </div>
        </div>
      </section>
    </div>
  )
}
