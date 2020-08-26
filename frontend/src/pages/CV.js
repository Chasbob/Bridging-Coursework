import React from "react"
import useSWR from "swr"
import { get } from "../utils/fetcher"

import Item from "../components/cv/Item"

export default function CV() {
  const { data: items } = useSWR("/api/cv/", get, {
    initialData: [],
    revalidateOnMount: true,
  })
  const tiles = items.map(item => <Item key={item.id} item={item} />)
  return (
    <section className="section">
      <div className="container">
        <div className="tile is-ancestor">{tiles}</div>
      </div>
    </section>
  )
}
