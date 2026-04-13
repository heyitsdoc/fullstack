require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Phonebook = require('./mongo.js');

const app = express();
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}));
app.use(express.static('dist'))


app.post('/api/persons', async (req, res , next) => { 
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }

    const existingPerson = await Phonebook.findOne({ name: body.name });
    if (existingPerson) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const person = new Phonebook({
        name: body.name,
        number: body.number
       
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
    }).catch(error => next(error))
});

app.get('/api/persons', (req, res , next) => {
    Phonebook.find({}).then(result => {
        res.json(result); // No need to loop and push to a manual array
    }).catch(error => next(error))
});

app.get('/api/persons/:id', (req, res , next) => {
    Phonebook.findById(req.params.id).then(result => {
        if (result) {
            res.json(result);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error))
}); 

// GET endpoint for info
app.get('/info', (req, res) => {
    Phonebook.countDocuments({}).then(count => {
        res.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
        `);
    });
});

// DELETE endpoint to remove a person by ID
app.delete('/api/persons/:id', (req, res , next) => {
    Phonebook.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        }).catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = {
    name: name,
    number: number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
    else if (error.name === 'ValidationError') {        
    return response.status(400).json({ error: error.message })
  } 
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 