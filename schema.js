var mongoose = require('mongoose');

var postschema = new mongoose.Schema({
  title: String,
  content: String
});
var posts = mongoose.model('Posts', postschema);

var schema = new mongoose.Schema({
  name: String,
  posts: [postschema] // embedd
});
var schema = mongoose.model('Test', schema);

// adding data from schema.js
var newData = new schema({
  name: "data from schema"
})

newData.posts.push({
  title: "new title",
  content: "this is a long post"
});

newData.save(function (err, user) {
  if (err) {
    console.log('Error');
  }
  console.log(user);
});

module.exports = schema;