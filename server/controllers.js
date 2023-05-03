const connectDb = require('./db.js')

exports.getQuestions = (req,res) => {
  connectDb.query(`SELECT * FROM questions where product_id = ${req.query.product_id}`)
  .then((data) => {
    // res.send({product_id: req.query.product_id, results: data.rows})
    data.rows.forEach((question) => {
      // console.log('q', question.question_id)
      connectDb.query(`SELECT * FROM answers where question_id = ${question.question_id}`)
      .then((answers) => {
        question.answers = {};
        question.answers.photos = [];

        answers.rows.forEach((answer) => {
          console.log('ans', answer)
          Object.assign(question.answers, answer)
          connectDb.query(`SELECT * FROM answers_photos where answer_id = ${answer.id}`)
          .then((photos) => {
            console.log('weve made it', photos.rows)
            if (photos.rows) {
              photos.rows.forEach((photo) => {
                console.log('foto', question.answers.photos)
                question.answers.photos.push(photo.url)
              })
            }
          res.send({product_id: req.query.product_id, results: data.rows})
          })
          .catch((err) => {
            console.log('i cannot find photos')
          })
        })
      })
      .catch((err) => {
        console.log('i cannot find answers', err)
      })
    })
  })
  .catch((err) => {
    console.log('i cannot find questions', err)
  })
}











exports.getAnswers = (req, res) => {
  connectDb.query(`SELECT * FROM answers where question_id = ${question_id}`)
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log('i cannot find answers', err)
  })
}

exports.addQuestions = (req,res) => {
  connectDb.query(`INSERT INTO questions VALUES (${req.body.body, req.body.asker_name, req.body.asker_email}) where product_id = ${product_id}`)
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log('i cannot find questions', err)
  })
}