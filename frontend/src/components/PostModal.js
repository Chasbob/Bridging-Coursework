import React, { useState } from "react"
import moment from "moment"

export default function PostModal({ onSubmit, onClose, data }) {
  const [form, setForm] = useState(
    data || {
      title: "",
      text: "",
      created_date: moment(new Date()).format("YYYY-MM-DDThh:mm"),
      published_date: moment(new Date()).format("YYYY-MM-DDThh:mm"),
      author: 0,
    }
  )

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
