import React from "react"
import { Dropdown, DropdownItem } from "./Dropdown"
import { Link } from "react-router-dom"
import Truncate from "react-truncate"

export default function CRUD({
  data,
  basePath,
  handleDelete,
  children,
  modalActive,
  setModalActive,
  controls,
}) {
  const url = null
  controls = controls || (
    <div className="card-footer">
      <Link className="card-footer-item" to={`/${basePath}/${data.id}`}>
        View
      </Link>
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
    <div className="grid-item" id={`${basePath}-${data.id}`}>
      {modalActive && children}
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">
            <Truncate lines={1}>{data.title}</Truncate>
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
