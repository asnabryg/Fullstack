import React from 'react'
import AnectodeForm from "./components/AnectodeForm"
import AnectodeList from './components/AnectodeList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeForm />
      <AnectodeList />
    </div>
  )
}

export default App