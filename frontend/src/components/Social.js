import React from "react"

import { DiGithub } from "react-icons/di"
import { FaLinkedin, FaTwitter, FaBlog, FaScroll } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"
import { Link } from "react-router-dom"

export default function Social() {
  return (
    <nav className="panel mt-3">
      <p className="panel-heading is-family-primary">Links</p>
      <Link className="panel-block is-active" to="/blog">
        <span className="panel-icon">
          <FaBlog />
        </span>
        Blog
      </Link>
      <Link className="panel-block is-active" to="/cv">
        <span className="panel-icon">
          <FaScroll />
        </span>
        CV
      </Link>
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
