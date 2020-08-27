import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { post, remove, put, get } from "../../utils/fetcher"
import ItemModal from "../../components/cv/ItemModal"
import CRUD from "../../components/CRUD"

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
  const toItems = async endpoint => {
    let json = await get(endpoint)
    return json.map(item => <CVCRUD key={item.id} data={item} token={token} />)
  }
  const { data: education } = useSWR("/api/cv/types/1/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: projects } = useSWR("/api/cv/types/2/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: work } = useSWR("/api/cv/types/3/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: volunteering } = useSWR("/api/cv/types/4/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const [modalActive, setModalActive] = useState(false)
  return (
    <div>
      {modalActive && (
        <ItemModal onSubmit={handleModalSubmit} onClose={handleModalClose} />
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
          <div className="columns py-3">
            <div className="column">
              <article className="notification is-primary py-3">
                <p className="title is-family-primary">Education</p>
              </article>
              {education}
            </div>
            <div className="column">
              <article className="notification is-primary py-3">
                <p className="title is-family-primary">Projects</p>
              </article>
              {projects}
            </div>
            <div className="column">
              <article className="notification is-primary py-3">
                <p className="title is-family-primary">Work</p>
              </article>
              {work}
            </div>
            <div className="column">
              <article className="notification is-primary py-3">
                <p className="title is-family-primary">Volunteering</p>
              </article>
              {volunteering}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CVCRUD({ data, token }) {
  const url = null
  const [modalActive, setModalActive] = useState(false)
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handleModalSubmit = async form => {
    await put(`/api/cv/${data.id}/`, form, token)
    mutate("/api/cv/")
    setModalActive(false)
  }
  const handleDelete = async () => {
    await remove(`/api/cv/${data.id}/`, token)
    mutate("/api/cv/")
  }
  const controls = (
    <div className="card-footer">
      <a
        className="card-footer-item"
        href={url}
        onClick={() => setModalActive(true)}
      >
        Edit
      </a>
    </div>
  )
  return (
    <div className="py-3">
      <CRUD
        basePath="cv"
        key={data.id}
        data={data}
        handleDelete={handleDelete}
        modalActive={modalActive}
        setModalActive={handleModalOpen}
        controls={controls}
      >
        <ItemModal
          data={data}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      </CRUD>
    </div>
  )
}
