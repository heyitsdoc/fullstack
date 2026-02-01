import { useState } from 'react'
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with:
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}
const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Person = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const checkPersonExist = (name) => {
    return persons.some(person => person.name === name)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (checkPersonExist(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(prev => prev.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />


      <h2>Add a New</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} />

    </div>
  )
}

export default App
setFilter