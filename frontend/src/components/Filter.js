export const Filter = ({ setFilter }) => {
  const filterPerson = (e) => setFilter(e.target.value);

  return(
    <div>
      <div>filter shown with <input onChange={filterPerson} /></div>
    </div>
  )
}

export default Filter;
