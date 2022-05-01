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
  response.send('<p>Please navigate to /api/persons for content</p>');
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => response.json(people));
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end();
      }
    })
    .catch(err => {
      console.log(err);
      response.status(400).send({ error: 'malformed id' })
    })
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(e => next(e));
});

app.post('/api/persons', (request, response, next) => {
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
    .then(savedPerson => response.json(savedPerson))
    .catch(e => next(e))
});

app.put('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person.number = request.body.number
      person.save()
        .then(updatedPerson => response.json(updatedPerson))
        .catch(e => next(e));
    })
    .catch(e => next(e));
})

app.get('/info', (request, response) => {
  Person.find({})
    .then(result => response.send(`
        <p>Phonebook has info for ${result.length || 0} people</p>
        <p>${Date()}</p>
`));
})

// From https://fullstackopen.com/en/part3/saving_data_to_mongo_db#error-handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch(error.name) {
  case 'CastError':
    return response.status(400).send({ error: 'malformed id' })
  case 'ValidationError':
    return response.status(400).json({ error: error.message })
  case 'MongoServerError':
    if (error.message.includes('duplicate key')) {
      return response.status(400).json({ error: 'Name already exists' })
    }
  }

  next(error);
}

app.use(errorHandler);


