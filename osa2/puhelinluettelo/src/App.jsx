import { useEffect, useState } from 'react'
import axios from 'axios'


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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber]=useState('')
  const[filter, setFilter]=useState('')

  useEffect(()=>{
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response=>{
        setPersons(response.data)
      })
      
  },[])

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