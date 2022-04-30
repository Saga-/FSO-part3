import personApiService from '../services/personApiService';

export const Persons = ({ persons, filter, setPersons }) => {

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personApiService.deletePerson(person.id)
        .then(() => {
            personApiService.getAllPersons()
              .then(res => setPersons(res))
          }
        )
        .catch(() => alert('unable to delete user'));
      }
  }


  const renderPersons = () => {
    if (!filter) {
      return persons.map(person => {
        return (
          <div key={person.name}>{person.name} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        )
      })
    }
    const personsFiltered = persons.filter(person => new RegExp(filter, 'i').test(person.name))
    return personsFiltered.map(person => {
      return (
        <div key={person.name}>{person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      )
    });
  }

  return renderPersons();
}

export default Persons;
