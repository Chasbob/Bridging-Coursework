import React from "react"
export default function Notification({ notification, setNotification }) {
  const handelNotificationClose = () => {
    setNotification(false)
  }

  return (
    <div
      className={`notification is-danger ${notification ? "" : "is-hidden"}`}
    >
      <button className="delete" onClick={handelNotificationClose} />
      <p>{JSON.stringify(notification)}</p>
    </div>
  )
}
