import React, { useEffect, useState } from 'react'
import "./index.css"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personService from "./services/personService"

const App = () => {

  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState([null, null]) //[notifiationStyle, message]

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
    personService.getAll()
    .then(allPersons => {
      if (!allPersons.some(p => p.name === newName)) {
        const person = {
          name: newName,
          number: newNumber
        }
        personService.create(person)
          .then(returnedData => {
            const newPersons = allPersons.concat(returnedData)
            setPersons(newPersons)
            setNewName("")
            setNewNumber("")
            setFilteredPersons(newPersons.filter(p =>
              p.name.toLowerCase().includes(newFilter.toLowerCase())))
            setNotification(["green", `Added ${returnedData.name}`])
            setTimeout(() => {
              setNotification([null, null])
            }, 5000)
          })
          .catch(error => {
            console.log(`Fail to add person: ${person.name}`)
            setNotification(["red", error.response.data.error])
            setTimeout(() => {
              setNotification([null, null])
            }, 5000)
          })
      }else{
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
          const person = allPersons.find(p => p.name === newName)
          const updatedPerson = {...person, number: newNumber}
          personService.update(person.id, updatedPerson)
            .then(returnedPerson => {
              const updatedPersons = allPersons.map(p => p.id === person.id ? returnedPerson : p)
              setPersons(updatedPersons)
              setFilteredPersons(updatedPersons.filter(p =>
                p.name.toLowerCase().includes(newFilter.toLowerCase())))
              setNewName("")
              setNewNumber("")
            })
            .catch(error => {
              console.log('Error changing number:', error)
              setNotification(["red", error.response.data.error])
              setTimeout(() => {
                setNotification([null, null])
              }, 5000)
            })
        }
      }
    })
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
        .catch(() => {
          setNotification(["red", `Information of ${person.name} has already been removed from server`])
          setTimeout(() => {
            setNotification([null, null])
          }, 5000)
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
      <Notification
        notification={notification}/>
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

const Notification = ({notification}) => {
  if (notification[1] === null)
    return null
  return (
    <div className="notification" style={{color: notification[0]}}>
      {notification[1]}
    </div>
  )
}

export default App