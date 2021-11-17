import React, { useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = (props) => {

  const [favoriteGenre, setGenre] = useState(null)

  const me = useQuery(ME, {
    onCompleted: ({ me }) => {
      console.log('me', me)
      setGenre(me.favoriteGenre)
    },
    fetchPolicy: "no-cache"
  })
  
  let books = useQuery(ALL_BOOKS, {variables: {genre: favoriteGenre}})

  if (!props.show) {
    return null
  }
  if (!me || !favoriteGenre) {
    return (
      <div>
        No favorite genre
      </div>
    )
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
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
          {books.data.allBooks.map(b => 
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>  
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations