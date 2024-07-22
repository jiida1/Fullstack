import { useState } from 'react'

const Filter=({filter, handleFilterChange})=>{
  return(
    <div>
        filter shown with<input value={filter} onChange={handleFilterChange}/>
      </div>
  )
}

const PersonForm=({addPerson, newName, handleNameChange, newNumber, handleNumberChange})=>{
  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons=({personsEsilla})=>{
  return(
    <ul>
        {personsEsilla.map(person=>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
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
  const[newNumber, setNewNumber]=useState('')
  const[filter, setFilter]=useState('')

  const addPerson=(event)=>{
    event.preventDefault()

    if (persons.some(person=>person.name===newName)){
      alert(newName+' is already added to phonebook')

    }else{
      const newPerson={
        name:newName,
        number:newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange=(event)=>{
    setFilter(event.target.value)
  }
const personsEsilla=filter
  ? persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
  :persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />

      <h2>Numbers</h2>
      <Persons personsEsilla={personsEsilla}/>
      
    </div>
  )

}

export default App