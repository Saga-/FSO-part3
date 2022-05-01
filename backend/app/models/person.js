const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to:', url);

mongoose.connect(url)
  .then(res => console.log('connected to MongoDB'))
  .catch(err => console.error('error connecting to MongoDB:', err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: v => /(^\d{2}-\d{5,})|(^\d{3}-\d{4,})|(^\d{8,})/.test(v),
      message: props => `${props.value} is not a valid phone number`
    },
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Person', personSchema);
