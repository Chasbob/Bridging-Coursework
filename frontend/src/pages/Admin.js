import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { get, post } from "../utils/fetcher"
import CRUD from "../components/CRUD"
import { FaPlusCircle } from "react-icons/fa"

export default function Admin() {
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
    await post("/api/blog/", form)
    mutate("/api/blog/")
    setModalActive(false)
  }
  return (
    <div>
      {modalActive && (
        <NewPostModal onCreate={handleModalSubmit} onClose={handleModalClose} />
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

function NewPostModal({ onCreate, onClose }) {
  const [form, setForm] = useState({
    author: "",
    title: "",
    text: "",
    // created_date: "",
    // published_date: "",
  })

  const handleSubmit = event => {
    event.preventDefault()
    if (onCreate) {
      onCreate(form)
    }
  }

  const handleInputChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <form className="box" onSubmit={handleSubmit}>
          <h1 className="title">Create Post</h1>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Post Title"
                value={form.title}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Text</label>
            <div className="control">
              <textarea
                name="text"
                className="textarea"
                placeholder="e.g. Hello world"
                value={form.text}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Created date</label>
            <div className="control">
              <input
                name="created_date"
                type="date"
                className="date input"
                value={form.created_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Published date</label>
            <div className="control">
              <input
                name="published_date"
                type="date"
                className="date input"
                value={form.published_date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="button is-primary is-inverted"
                type="submit"
                value="Submit"
              ></input>
            </div>
          </div>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  )
}
