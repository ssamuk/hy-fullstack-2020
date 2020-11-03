import React, { useState, useEffect } from 'react'
import PersonForm from '../src/components/PersonForm'
import Persons from '../src/components/Persons'
import Filter from '../src/components/Filter'
import personService from '../src/services/persons'


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [notification, setNotification] = useState(null)
  
  
  useEffect(() => {
    personService
    .getAll()
    .then(Persons => {
      setPersons(Persons)
    })
  }, [])


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const searchTermChange = event => {
    setSearchTerm(event.target.value)
  }


  const addNew = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    let n = true;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name === newObject.name){
        n = false
      }
    }
    if(n === true){
      personService.create(newObject)
      .then(Persons => {
        setPersons(persons.concat(Persons))
      })
        setNewName('')
        setNewNumber('')
    }
    else{
      setNotification(`ALERT! '${newObject.name}' is allready in phonebook`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleRemove = (id) => {
    const toBeDeleted = persons.filter(person => person.id === id)
    if(toBeDeleted.length === 1 || toBeDeleted.length === 2){
      if (window.confirm("Do you really want to delete he/she")){
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter
      value={searchTerm}
      onChange={searchTermChange}/>
      <div><h2>Add new</h2></div>
      <PersonForm 
      addNew = {addNew} 
      newName = {newName} 
      newNumber = {newNumber}
      handleNameChange = {handleNameChange} 
      handleNumberChange = {handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons
      persons = {persons.filter(person => person.name.match(new RegExp(searchTerm, 'i')))}
      onRemove = {handleRemove}
      />
    </div>
  )

}

export default App