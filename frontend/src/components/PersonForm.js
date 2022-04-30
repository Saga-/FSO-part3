import personApiService from '../services/personApiService';

export const PersonForm = ({ setNewName, setNewNumber, setPersons, newName, newNumber, persons, setMsg }) => {
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }


  const handleFormSubmit = (e) => {
    debugger;
    e.preventDefault();
    const existingPersonArr = persons.filter(person => person.name === newName);
    if (existingPersonArr.length) {
       const existingPerson = existingPersonArr[0];
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
      } else {
        const msg = `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`;
        if (window.confirm(msg)) {
          const newPerson = {
            name: newName,
            number: newNumber
          };
          personApiService.updatePerson(existingPerson.id, newPerson)
            .then(() => {
              personApiService.getAllPersons().then(res => setPersons(res));
            })
            .catch(() => {
              setMsg({error: `Information of ${existingPerson.name} has already been removed from server`})
              setTimeout(() => {
                setMsg(null)
              }, 5000)
            });
        }
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personApiService.addNewPerson(newPerson)
        .then(() => {
          setMsg({success: `Added ${newPerson.name}`});
          setTimeout(() => {
            setMsg(null);
          }, 5000)
          personApiService.getAllPersons().then(res => setPersons(res));
          setNewName('');
          setNewNumber('');
        })
        .catch(() => alert('Error: Person not saved'))
    }
  }


  return(
    <form>
      <div>name: <input value={ newName} onChange={handleNameChange} /></div>
      <div>number: <input value={ newNumber } onChange={handleNumberChange} /></div>

      <div>
        <button type="submit" onClick={handleFormSubmit}>add</button>
      </div>
    </form>
  )
}

export default PersonForm;
