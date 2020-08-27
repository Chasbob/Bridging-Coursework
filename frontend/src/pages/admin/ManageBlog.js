import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { get, post } from "../../utils/fetcher"
import CRUD from "../../components/CRUD"
import PostModal from "../../components/post/PostModal"
import { FaPlusCircle } from "react-icons/fa"
import moment from "moment"
import { remove, put } from "../../utils/fetcher"

export default function ManageBlog() {
  const { data: authenticated } = useSWR("authenticated", () =>
    localStorage.getItem("token") !== null ? true : false
  )
  const { data: token } = useSWR(authenticated ? "token" : null, () =>
    localStorage.getItem("token")
  )
  const [userId] = useState(
    authenticated ? JSON.parse(localStorage.getItem("user")).pk : ""
  )

  const { data: posts } = useSWR("/api/blog/", get, {
    initialData: [],
    revalidateOnMount: true,
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
  const cruds = posts.map(item => {
    item.created_date = moment(new Date(item.created_date)).format("YYYY-MM-DD")
    item.published_date = moment(new Date(item.published_date)).format(
      "YYYY-MM-DD"
    )
    return <BlogCRUD key={item.id} data={item} userId={userId} token={token} />
  })

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
          <div className="grid">{cruds}</div>
        </div>
      </section>
    </div>
  )
}

function BlogCRUD({ data, userId, token }) {
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
    await put(`/api/blog/${data.id}/`, form, token)
    mutate("/api/blog/")
    setModalActive(false)
  }
  const handleDelete = async () => {
    await remove(`/api/blog/${data.id}/`, token)
    mutate("/api/blog/")
  }
  return (
    <CRUD
      key={data.id}
      data={data}
      basePath="blog"
      handleDelete={handleDelete}
      modalActive={modalActive}
      setModalActive={handleModalOpen}
    >
      <PostModal
        data={data}
        onSubmit={handleModalSubmit}
        onClose={handleModalClose}
      />
    </CRUD>
  )
}
