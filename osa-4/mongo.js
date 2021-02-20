/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { request, response } = require("express")
const mongoose = require("mongoose")

if (process.argv.length<3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ackfw.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)


if (process.argv.length > 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })


  person.save().then(response => {
    console.log("Saved person: ",person.name, "with number", person.number,
      "to phonebook.")
    mongoose.connection.close()
  })
/*
const person = new Person({
    name: `Samu`,
    number: `0400123123`,
    id: 1
})
*/
}else{

  Person.find({}).then(person => {
    console.log("phonebook:")
    person.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

}

