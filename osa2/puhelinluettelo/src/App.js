import React, { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const addNewPerson = (event) => {
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const person = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(person)
      setPersons(newPersons)
      setNewName("")
      setNewNumber("")
      setFilteredPersons(newPersons.filter(p =>
        p.name.toLowerCase().includes(newFilter.toLowerCase())))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState("")
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [filteredPersons, setFilteredPersons] = useState([...persons])

  const [newFilter, setNewFilter] = useState("")
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value === ""){
      setFilteredPersons([...persons])
    }else{
      setFilteredPersons(persons.filter(p =>
        p.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}/>
    </div>
  )
}

export default App