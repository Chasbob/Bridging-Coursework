import React from "react"
import useSWR from "swr"
import { get } from "../utils/fetcher"

import Item from "../components/cv/Item"

export default function CV() {
  const toItems = async endpoint => {
    let json = await get(endpoint)
    return json.map(item => <Item key={item.id} item={item} />)
  }
  const { data: education } = useSWR("/api/cv/types/1/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: projects } = useSWR("/api/cv/types/2/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: work } = useSWR("/api/cv/types/3/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  const { data: volunteering } = useSWR("/api/cv/types/4/", toItems, {
    initialData: [],
    revalidateOnMount: true,
  })
  return (
    <section className="section">
      <div className="container">
        <div className="columns py-3">
          <div className="column">
            <article className="notification is-primary py-3">
              <p className="title is-family-primary">Education</p>
            </article>
            {education}
          </div>
          <div className="column">
            <article className="notification is-primary py-3">
              <p className="title is-family-primary">Projects</p>
            </article>
            {projects}
          </div>
          <div className="column">
            <article className="notification is-primary py-3">
              <p className="title is-family-primary">Work</p>
            </article>
            {work}
          </div>
          <div className="column">
            <article className="notification is-primary py-3">
              <p className="title is-family-primary">Volunteering</p>
            </article>
            {volunteering}
          </div>
        </div>
      </div>
    </section>
  )
}
