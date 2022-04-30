const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 3001;
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
  const handleError = msg => response.status(400).json({ error: msg })

  const body = request.body
  if (!body.name) {
    handleError('name missing in request');
  }
  if (!body.number) {
    handleError('number missing in request');
  }
  if (persons.find(person => person.name === body.name)) {
    handleError('name must be unique');
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



