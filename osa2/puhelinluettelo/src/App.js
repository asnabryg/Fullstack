import React, { useEffect, useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])
  
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