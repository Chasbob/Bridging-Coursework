import React, { useState } from "react"
import { Dropdown, DropdownItem, DropdownDivider } from "./Dropdown"
import { Link } from "react-router-dom"

export default function CRUD({ post }) {
  let controls = (
    <div className="card-footer">
      <Link className="card-footer-item" to={`/${post.id}`}>
        View
      </Link>
      <a className="card-footer-item">Edit</a>
    </div>
  )
  return (
    <div className="grid-item">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">{post.title}</p>
          <div className="card-header-icon">
            <Dropdown right={true}>
              <DropdownItem>Delete</DropdownItem>
            </Dropdown>
          </div>
        </div>
        {controls}
      </div>
    </div>
  )
}
