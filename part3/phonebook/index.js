require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const Phonebook = require('./mongo.js');

const app = express();
app.use(express.json());
app.use(cors())
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

app.get('/api/persons', (req, res) => {
    let book = []
    Phonebook.find({}).then(result => {
        result.forEach(entry => {
            book.push(entry)
        })
        res.json(book);
    })

});

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = persons.length;
    persons = persons.filter(person => person.id !== id);
    if (persons.length < initialLength) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const newPerson = new Phonebook({
        id: (Math.random() * 1000000).toFixed(0),
        name: body.name,
        number: body.number
    })
    
    persons = persons.concat(newPerson);
    res.json(newPerson);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 