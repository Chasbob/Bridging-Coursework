import React from "react"

import { DiGithub } from "react-icons/di"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

export default function Social() {
  return (
    <nav className="panel">
      <p class="panel-heading">Links</p>
      <a class="panel-block is-active" href="https://github.com/Chasbob">
        <span class="panel-icon">
          <DiGithub />
        </span>
        GitHub
      </a>
      <a
        class="panel-block is-active"
        href="https://www.linkedin.com/in/charles-de-freitas/"
      >
        <span class="panel-icon">
          <FaLinkedin />
        </span>
        Linkedin
      </a>
      <a class="panel-block is-active" href="https://twitter.com/chasbob97">
        <span class="panel-icon">
          <FaTwitter />
        </span>
        Twitter
      </a>
      <a class="panel-block is-active" href="mailto:charles@defreitas.io">
        <span class="panel-icon">
          <AiOutlineMail />
        </span>
        Email
      </a>
    </nav>
  )
}
