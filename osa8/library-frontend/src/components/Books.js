import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [genre, setGenre] = useState("")

  let books = useQuery(ALL_BOOKS)
  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }
  books = books.data.allBooks

  const genres = [...new Set(books.map(b => b.genres).flat())]

  if (genre) {
    books = books.filter(b => b.genres.includes(genre))
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => 
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  )
}

export default Books