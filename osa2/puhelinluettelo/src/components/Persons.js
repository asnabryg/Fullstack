import React from "react"

const Persons = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(person =>
                <Person
                    key={person.name}
                    person={person}
                    handleDelete={handleDelete}/>)}
        </div>
    )
}

const Person = ({person, handleDelete}) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
    )
}

export default Persons