require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers.js');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/qa/questions', controllers.getQuestions);




















app.get('/qa/questions/:question_id/answers', (req, res) => {
  controllers.getAnswers(req.params.question_id, res);
})

app.post('/qa/questions/:product_id', (req, res) => {
  controllers.addQuestions(req.params.product_id, res);
})

app.post('/qa/questions/:question_id/answers', (req, res) => {

})

app.put('/qa/questions/:question_id/helpful', (req, res) => {

})

app.put('/qa/questions/:question_id/report', (req, res) => {

})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

})

app.put('/qa/answers/:answer_id/report', (req, res) => {

})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})