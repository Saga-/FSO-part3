require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.req(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ');
}))

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

app.get('/', (request, response) => {
  response.send(`<p>Please navigate to /api/persons for content</p>`);
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => response.json(people));
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => response.json(person));
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
  const handleError = msg => response.status(400).json({ error: msg })

  const body = request.body
  if (!body.name) {
    handleError('name missing in request');
  }
  if (!body.number) {
    handleError('number missing in request');
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => response.json(savedPerson));
});

app.get('/info', (request, response) => {
  const size = persons.length;
  response.send(`
    <p>Phonebook has info for ${size} people</p>
    <p>${Date()}</p>
  `)
})



