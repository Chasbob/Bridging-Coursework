import React, { useState } from "react"
import { mutate } from "swr"
import { post } from "../../utils/fetcher"
import ItemModal from "../../components/cv/ItemModal"

import { FaPlusCircle } from "react-icons/fa"
export default function ManageCV() {
  const [authenticated] = useState(
    localStorage.getItem("token") !== null ? true : false
  )

  const [token] = useState(authenticated ? localStorage.getItem("token") : "")

  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handleModalSubmit = async form => {
    await post("/api/cv/", form, token)
    mutate("/api/cv/")
    setModalActive(false)
  }
  const [modalActive, setModalActive] = useState(false)
  return (
    <div>
      {modalActive && (
        <ItemModal onSubmit={handleModalSubmit} onClose={handleModalClose} />
      )}
      <section className="section">
        <button
          className="button is-block is-primary is-outlined"
          onClick={handleModalOpen}
        >
          <span className="icon">
            <FaPlusCircle />
          </span>
          <span>New</span>
        </button>
      </section>
    </div>
  )
}
