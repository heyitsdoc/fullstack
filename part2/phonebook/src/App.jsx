import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const hendlebutton = (event) => {
    event.preventDefault()
    console.log('button clicked', event)
    persons.map((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
      }
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input  onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={hendlebutton} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}

    </div>
  )

}

export default App