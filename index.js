var express = require('express')
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Crud = require('./schema');

mongoose.connect('mongodb://localhost/test-crud', {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {

    Crud.find({}, function (err, result) {
      if (err)
        console.log('Error');
      else
        res.status(200).json({
          'name': result
        });
    });

  })
  .get('/:id', function (req, res) {
    Crud.findById(
      req.params.id,
      function (err, result) {
        if (err)
          console.log('Error');
        else
          res.status(200).json({
            'result': result
          });
      });
  })
  .post('/', function (req, res) {

    Crud.create({
      name: req.body.name
    }, function (err, result) {
      if (err)
        console.log('Error');
      else
        res.status(201).json({
          'name': result
        });
    });

  })

  .post('/embed', function (req, res) {
    Crud.findOne({
      "_id": "5cf7ce5d7750e72d501e28fe"
    }, function (err, post) {
      if (err)
        console.log(err)

      post.posts.push({
        title: req.body.title,
        content: req.body.content
      });

      post.save(function (err, user) {
        if (err) {
          console.log('Error');
        }        
      });
      res.end();
    });    

  })

  .put('/:id', function (req, res) {
    console.log();
    Crud.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, function (err, result) {
      if (err) {
        console.log('Error');
      }
      res.status(200).json({
        "Record updated": result
      });
    });
  })
  .delete('/:id', function (req, res) {
    Crud.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log('Error');
      }
      res.status(200).json({
        "Record updated": "deleted"
      });
    });
  });

app.listen(3000, function () {
  console.log('App is listening at port 3000');
});