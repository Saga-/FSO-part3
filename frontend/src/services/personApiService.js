import axios from 'axios';

const baseUrl = 'https://immense-atoll-49825.herokuapp.com/api/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const addNewPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(res => res.data).catch(e => e);
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(res => res.data)
}

const updatePerson = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data);
  return request.then(res => res.data);
}

const personApiService = { getAllPersons, addNewPerson, deletePerson, updatePerson }

export default personApiService
