import React, { useState, useEffect } from "react"

import { FaAngleDown } from "react-icons/fa"

export function Dropdown({ children, right }) {
  const [active, setActive] = useState(false)

  const handleClick = event => {
    setActive(!active)
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  useEffect(() => {
    const onExternalClick = () => {
      setActive(false)
    }
    document.addEventListener("click", onExternalClick)
    return () => {
      document.removeEventListener("click", onExternalClick)
    }
  }, [])

  return (
    <div
      className={`dropdown ${active ? "is-active" : ""} ${
        right ? "is-right" : ""
      }`}
    >
      <div className="dropdown-trigger" onClick={handleClick}>
        <span className="icon">
          <FaAngleDown />
        </span>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  )
}

export function DropdownItem({ children, disabled, onClick }) {
  const handleClick = () => {
    if (onClick && !disabled) onClick()
  }

  const url = null;
  return (
    <a
      href={url}
      className={`dropdown-item ${disabled ? "has-text-grey-light" : ""}`}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export function DropdownDivider() {
  return <hr className="dropdown-divider" />
}
