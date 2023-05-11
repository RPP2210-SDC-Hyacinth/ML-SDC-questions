require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers.js');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.get('/qa/questions', controllers.getQuestions);

app.get('/qa/questions/:question_id/answers', controllers.getAnswers);

app.post('/qa/questions/', controllers.addQuestions)

app.post('/qa/questions/:question_id/answers', controllers.addAnswer)

app.put('/qa/questions/:question_id/helpful', controllers.questionHelpful)

app.put('/qa/questions/:question_id/report', controllers.questionReport)

app.put('/qa/answers/:answer_id/helpful', controllers.answerHelpful)

app.put('/qa/answers/:answer_id/report', controllers.answerReport)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


module.exports = app;