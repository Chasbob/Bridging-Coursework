import React from "react"
import useSWR from "swr"
import { Helmet } from "react-helmet-async"
import { get } from "../utils/fetcher"

import Item from "../components/cv/Item"

export default function CV() {
  const toItems = async endpoint => {
    let json = await get(endpoint)
    let output = {}
    types.forEach(element => {
      output[element.name] = json
        .filter(item => item.category === element.id)
        .map(item => <Item key={item.id} item={item} />)
    })
    return output
  }
  const { data: types } = useSWR("/api/cv/types/", get)
  const { data: items } = useSWR(types ? "/api/cv/" : null, toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const columns = Object.keys(items).map(col => {
    return (
      <div key={col} className="column">
        <article className="notification is-primary py-3">
          <p className="title is-family-primary">{col}</p>
        </article>
        {items[col]}
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
