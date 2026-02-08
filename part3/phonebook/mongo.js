const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const user = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://deep:${password}@cluster0.kapmxpf.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phonebook = new mongoose.Schema({
  user: String,
  number: String,
})

const Note = mongoose.model('Phonebook', phonebook)

const note = new Note({
    user: user,
    number: number,
})

note.save().then(result => {
  console.log(`added ${user} number ${number} to phonebook`)
  mongoose.connection.close()
})