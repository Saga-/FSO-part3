import {useEffect, useState} from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personApiService from './services/personApiService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    personApiService.getAllPersons()
      .then(persons => setPersons(persons))
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} />
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        setMsg={setMsg}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        persons={persons}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} setMsg={setMsg}/>
    </div>
  )
}

export default App
