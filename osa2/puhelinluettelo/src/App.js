import React, { useEffect, useState } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personService from "./services/personService"

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(data => {
        console.log('promise fulfilled')
        setPersons(data)
        setFilteredPersons(data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const person = {
        name: newName,
        number: newNumber
      }
      personService.create(person)
        .then(returnedData => {
          const newPersons = persons.concat(returnedData)
          setPersons(newPersons)
          setNewName("")
          setNewNumber("")
          setFilteredPersons(newPersons.filter(p =>
            p.name.toLowerCase().includes(newFilter.toLowerCase())))
        })
        .catch(error => {
          console.log(`Fail to add person: ${person.name}`)
          console.log(error)
        })
    }else{
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        personService.update(person.id, updatedPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(p => p.id === person.id ? returnedPerson : p)
            setPersons(updatedPersons)
            setFilteredPersons(updatedPersons.filter(p =>
              p.name.toLowerCase().includes(newFilter.toLowerCase())))
          })
          .catch(error => {
            console.log('Error changing number:', error)
          })
      }
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id)
        .then(() => {
          const newPersons = persons.filter(p => p.id !== id)
          setPersons(newPersons)
          setFilteredPersons(newPersons.filter(p =>
            p.name.toLowerCase().includes(newFilter.toLowerCase())))
        })
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
        persons={filteredPersons}
        handleDelete={handleDelete}/>
    </div>
  )
}

export default App