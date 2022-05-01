// Contents taken from https://fullstackopen.com/en/part3/saving_data_to_mongo_db#creating-and-saving-objects
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the correct args: node mongo.js <password> <name> <number> or node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://test123:${password}@cluster0.v26on.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(res => {
    console.log('phonebook:');
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close();
    process.exit(0);
  })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
});

person.save()
  .then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  })
