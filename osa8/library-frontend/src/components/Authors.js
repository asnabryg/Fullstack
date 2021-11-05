import React from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from "react-select"


const Authors = (props) => {

  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const authors = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const changeYear = async (event) => {
    event.preventDefault()
    editAuthor({variables: {name, setBornTo: parseInt(year)}})
    setName("")
    setYear("")
  }

  if (authors.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }

  const nameOptions = authors.data.allAuthors.map(a => {
    return {value: a.name, label: a.name}
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birthyear</h2>
      <form onSubmit={changeYear}>
        <Select
          placeholder="Select name"
          defaultValue={name}
          onChange={(target) => setName(target.value)} 
          options={nameOptions}
        />
        <br />
        born <input type="number" value={year} onChange={({target}) => setYear(target.value) }/>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors