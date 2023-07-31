const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://adeb:ManIsNotACat879@cluster0.bzkz1eq.mongodb.net/?retryWrites=true&w=majority";



MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection=db.collection('quotes');
    app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(3000, function () {
    console.log('May Node be with you'); // Updated output message
    console.log('listening on 3000');
});


app.get('/', (req, res) => {
  db.collection('quotes')
    .find()
    .toArray()
    .then(results => {
      res.render('index.ejs',{quotes:results})
    })
    .catch(error => console.error(error))


});

app.post('/quotes', (req, res) => {
  quotesCollection
    .insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/quotes', (req, res) => {
  quotesCollection
      .findOneAndUpdate(
          { name: 'Yoda' },
          {
              $set: {
                  name: req.body.name,
                  quote: req.body.quote,
              },
          },
          {
              upsert: true,
          }
      )
      .then(result => {res.json('Success')})
      .catch(error => console.error(error))
});
app.delete('/quotes', (req, res) => {
  quotesCollection
      .deleteOne({ name: req.body.name })
      .then(result => {
          if (result.deletedCount === 0) {
              return res.json('No quote to delete')
          }
          res.json(`Deleted Darth Vader's quote`)
      })
      .catch(error => console.error(error))
})
  })
.catch(console.error);