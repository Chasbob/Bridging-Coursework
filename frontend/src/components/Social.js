import React from "react"

import { DiGithub } from "react-icons/di"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

export default function Social() {
  return (
    <nav className="panel">
      <p className="panel-heading">Links</p>
      <a className="panel-block is-active" href="https://github.com/Chasbob">
        <span className="panel-icon">
          <DiGithub />
        </span>
        GitHub
      </a>
      <a
        className="panel-block is-active"
        href="https://www.linkedin.com/in/charles-de-freitas/"
      >
        <span className="panel-icon">
          <FaLinkedin />
        </span>
        Linkedin
      </a>
      <a className="panel-block is-active" href="https://twitter.com/chasbob97">
        <span className="panel-icon">
          <FaTwitter />
        </span>
        Twitter
      </a>
      <a className="panel-block is-active" href="mailto:charles@defreitas.io">
        <span className="panel-icon">
          <AiOutlineMail />
        </span>
        Email
      </a>
    </nav>
  )
}
