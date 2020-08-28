import React from "react"
import useSWR from "swr"
import { Helmet } from "react-helmet-async"
import { get } from "../utils/fetcher"

import Item from "../components/cv/Item"

export default function CV() {
  const toItems = () => {
    let output = {}
    types.forEach(element => {
      output[element.name] = items
        .filter(item => item.category === element.id)
        .map(item => <Item key={item.id} item={item} />)
    })
    return output
  }
  const { data: types } = useSWR("/api/cv/types/", get)
  const { data: items } = useSWR(types ? "/api/cv/" : null, get, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: cards } = useSWR(types ? ["cvitems", items] : null, toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const columns = Object.keys(cards).map(col => {
    return (
      <div key={col} className="column">
        <article className="notification is-primary py-3">
          <p className="title is-family-primary">{col}</p>
        </article>
        {cards[col]}
      </div>
    )
  })
  return (
    <section className="section">
      <Helmet>
        <title>Important Things - CV</title>
      </Helmet>
      <div className="container">
        <div className="py-3">{columns}</div>
      </div>
    </section>
  )
}
