const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

let persons =
  [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
  response.send(`<p>Please navigate to /api/persons for content</p>`);
});

app.get('/api/persons', (request, response) => {
  response.json(persons)
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  person ? response.json(person) : response.status(404).send('Person not found');
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (!person) {
    return response.status(404).end();
  }
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  console.log(request.body);
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const id = Math.floor((Math.random() * 5000) + 1);
  const person = {
    name: body.name,
    number: body.number,
    id
  }
  persons = persons.concat(person);
  response.json(person);
});


app.get('/info', (request, response) => {
  const size = persons.length;
  response.send(`
    <p>Phonebook has info for ${size} people</p>
    <p>${Date()}</p>
  `)
})




