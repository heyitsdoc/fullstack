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


app.post('/api/persons', async (req, res) => {
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
    }).catch(err => {
        res.status(500).json({ error: 'Failed to save to database' });
    });
});

app.get('/api/persons', (req, res) => {
    Phonebook.find({}).then(result => {
        res.json(result); // No need to loop and push to a manual array
    });
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
app.delete('/api/persons/:id', (req, res) => {
    Phonebook.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => {
            res.status(400).send({ error: 'malformatted id' });
        });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 