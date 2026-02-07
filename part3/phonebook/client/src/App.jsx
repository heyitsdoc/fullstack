import { useState, useEffect } from 'react'
import Requests from './Requests'
import './style.css'



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
const Person = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}

    </ul>
  )
}

const App = () => {

  // USE STATES
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationColor, setNotificationColor] = useState('gray')
  useEffect(() => {
    Requests.getAll().then(data => {
      console.log(data)
      setPersons(data)
    })
  }, [])

  const Notification = ({ message , notificationColor}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error" style={{color: notificationColor}}>
      {message}
      </div>
    )
  }


  const checkPersonExist = (name) => {
    return persons.some(person => person.name === name)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    Requests.remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      }).catch(error => {
        if (error.response?.status === 404) {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
        } else {
          setErrorMessage(`Error deleting ${person.name}`)
        }
        setNotificationColor("red")
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (checkPersonExist(newName)) {
      // alert(`${newName} is already added to phonebook`)
      setErrorMessage(`${newName} is already added to phonebook`)
      setNotificationColor("red")
      return
    }
    Requests.create({ name: newName, number: newNumber }).then(returnedPerson => {
      setPersons(prev => prev.concat(returnedPerson))
    })

    setErrorMessage("Added " + newName)
    setNotificationColor("green")
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notificationColor={notificationColor} />
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
      <Person personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App