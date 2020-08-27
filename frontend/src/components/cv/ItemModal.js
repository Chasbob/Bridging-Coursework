import React, { useState } from "react"
import useSWR from "swr"
import { get } from "../../utils/fetcher"
import * as FA from "react-icons/fa"

export default function ItemModal({ onSubmit, onClose, data }) {
  const { data: types } = useSWR("api/cv/types/", get, {
    initialData: [],
    revalidateOnMount: true,
  })
  let options = types.map(t => {
    return (
      <option key={t.id} value={t.id}>
        {t.name}
      </option>
    )
  })
  const [form, setForm] = useState(
    data || {
      title: "",
      description: "",
      location: "",
      category: 1,
      icon: "FaBookmark",
    }
  )
  const icons = Object.keys(FA).map(key => {
    return (
      <option key={key} value={key}>
        {key}
      </option>
    )
  })

  const handleSubmit = event => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(form)
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
          <h1 className="title">Create Item</h1>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
                placeholder="e.g. Hello world"
                value={form.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                name="location"
                className="input"
                type="text"
                placeholder="Everywhere!"
                value={form.location}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select
                name="category"
                className="input"
                type="select"
                value={form.category}
                onChange={handleInputChange}
              >
                {options}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Icon</label>
            <div className="control">
              <select
                name="icon"
                className="input"
                type="select"
                value={form.icon}
                onChange={handleInputChange}
              >
                {icons}
              </select>
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
