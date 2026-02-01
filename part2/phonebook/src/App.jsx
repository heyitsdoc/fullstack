import { useState } from 'react'

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
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('button clicked', event)
    if (checkPersonExist(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <h2>Add a New</h2>
      
      <form>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input onChange={(e) => setNewNumber(e.target.value)} /></div>
        <div>
          <button type="submit" onClick={handleSubmit} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person, index) => (
        <li key={index}>{person.name} {person.number}</li>

      ))}

    </div>
  )

}

export default App;