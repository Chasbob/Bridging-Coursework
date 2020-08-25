import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { get, post } from "../utils/fetcher"
import CRUD from "../components/CRUD"
import PostModal from "../components/PostModal"
import { FaPlusCircle } from "react-icons/fa"
import { useCookies } from "react-cookie"

export default function Admin() {
  const [cookies] = useCookies(["access"])
  const access = cookies.access

  const { data: posts } = useSWR("/api/blog/", get, {
    initialData: [],
    revalidateOnMount: true,
  })
  const cruds = posts.map(item => {
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
      form.author = parseInt(access.user.pk)
    }
    await post("/api/blog/", form, access.access_token)
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
