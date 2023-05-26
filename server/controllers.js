const connectDb = require('./db.js')
const redis = require('redis')


let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

//http://localhost:3000/qa/questions/?product_id=3&count=5&page=3
// LIMIT ${req.query.count} OFFSET ${req.query.page}
exports.getQuestions = async (req,res) => {
  // let results;
//   try {
//     const questions = req.query.product_id
//     const cacheResults = await redisClient.get(`questions?product_id=${questions}`);
//     if (cacheResults) {
//      return JSON.parse(cacheResults);
//     } else {
//     req.query.product_id = Number(req.query.product_id)
//     // console.log('type', typeof req.query.product_id)
    // let count = req.query.count || 5;
    // let page = req.query.page || 1;
//     connectDb.query(
//     `SELECT json_build_object(
//       'product_id', ${Number(req.query.product_id)},
//       'results', (WITH res AS (SELECT * from questions WHERE product_id = ${Number(req.query.product_id)} LIMIT ${count} OFFSET ${page})
//         SELECT json_agg(json_build_object(
//           'question_id', res.question_id,
//           'question_body', res.question_body,
//           'question_date', res.date_written,
//           'asker_name', res.asker_name,
//           'question_helpfulness', res.question_helpfulness,
//           'reported', res.reported,
//           'answers', COALESCE((SELECT json_object_agg(answers.id, json_build_object(
//             'id', answers.id,
//             'body', answers.body,
//             'date', answers.date_written,
//             'answerer_name', answers.answerer_name,
//             'helpfulness', answers.helpful,
//             'photos', COALESCE((SELECT json_agg(json_build_object(
//               'id', answers_photos.id,
//               'url', answers_photos.url
//             ))
//             FROM answers_photos WHERE answers_photos.answer_id = answers.id), '[]')
//           ))
//           FROM answers WHERE answers.question_id = res.question_id), '{}')
//         )) FROM res
//       ))`
//     )
//     .then((data) => {
//       if (!data) {
//         throw data;
//       }
//       redisClient.set(questions, JSON.stringify(data.rows[0].json_build_object));
//       // console.log('data from getQ', data.rows[0].json_build_object)
//     res.status(200).send(data.rows[0].json_build_object)
//     })
//     .catch((err) => {
//       console.log('err getting q', err)
//       res.status(404).send(err)
//     })
//   }

// } catch (error) {
//   console.error(error);
//   res.status(404).send("Data unavailable");
// }

try {
  const questions = req.query.product_id
  const cacheResults = await redisClient.get(`questions?product_id=${questions}`);
  if (cacheResults) {
   return JSON.parse(cacheResults);
  } else {
  req.query.product_id = Number(req.query.product_id)
  // console.log('type', req.query.product_id)
  let count = req.query.count || 5;
  let page = req.query.page || 1;
  connectDb.query(
    `SELECT json_agg(json_build_object(
      'question_id', questions.question_id,
      'question_body', questions.question_body,
      'question_date', questions.date_written,
      'asker_name', questions.asker_name,
      'question_helpfulness', questions.question_helpfulness,
      'reported', questions.reported,
      'answers', COALESCE((SELECT (json_object_agg(answers.id, json_build_object(
        'id', answers.id,
        'body', answers.body,
        'date', answers.date_written,
        'answerer_name', answers.answerer_name,
        'helpfulness', answers.helpful,
        'photos', COALESCE((SELECT json_agg(answers_photos.url) FROM answers_photos WHERE answers_photos.answer_id = answers.id), '[]')
      ))) FROM answers WHERE answers.question_id = questions.question_id), '{}')
      ))
      FROM questions WHERE product_id = ${req.query.product_id} LIMIT ${count} OFFSET ${(page-1)*count}`

)

  .then((data) => {
console.log('d', data.rows)
    if (!data) {
      throw data;
    }
    let dataObject = {product_id: req.query.product_id, results: data.rows[0].json_agg}
    // redisClient.set(questions, JSON.stringify(dataObject));

    // redisClient.set(questions, JSON.stringify(data.rows[0].json_build_object));
    // console.log('data from getQ', data.rows[0].json_build_object)
  res.status(200).send(dataObject)
  })
  .catch((err) => {
    console.log('err getting q', err)
    res.status(404).send(err)
  })
}

} catch (error) {
console.error(error);
res.status(404).send("Data unavailable");
}

}

//http://localhost:3000/qa/questions/1/answers/?count=5&page=3
exports.getAnswers = (req, res) => {
let count = req.query.count || 5;
let page = req.query.page || 1;
  connectDb.query(
    `SELECT json_build_object(
      'question', ${Number(req.params.question_id)},
      'page', ${page},
      'count', ${count},
      'results', (WITH res AS (SELECT * from answers WHERE question_id = ${Number(req.params.question_id)} LIMIT ${count} OFFSET ${page})
         SELECT json_agg(json_build_object(
          'answer_id', res.id,
          'body', res.body,
          'date', res.date_written,
          'answerer_name', res.answerer_name,
          'helpfulness', res.helpful,
          'photos', COALESCE((SELECT json_agg(json_build_object(
            'id', answers_photos.id,
            'url', answers_photos.url
          ))
          FROM answers_photos WHERE answers_photos.answer_id = res.id), '[]')
        ))
       FROM res
    ))`
  )
  .then((data) => {
    if (!data) {
      throw data;
    }
    // console.log('ddd', data.rows[0].json_build_object.results)
    if (data.rows[0].json_build_object.results === null) {
      data.rows[0].json_build_object.results = {}
    }
    res.status(200).send(data.rows[0].json_build_object)
  })
  .catch((err) => {
    console.log('i cannot find answers', err)
    res.status(404).send(err)
  })
}

//http://localhost:3000/qa/questions/
//product_id, body, asker_name, asker_email
exports.addQuestions = (req,res) => {

  console.log('here', JSON.stringify(req.body.body))
  let prodId = Number(req.body.product_id)
  console.log('pid', prodId)
  // console.log('req body', JSON.stringify(req.body))
  console.log('pid', prodId)
  let date_written = new Date().toISOString();
  let options = [prodId, req.body.body, date_written, req.body.name, req.body.email, 0]
  console.log('date', date_written)
  connectDb.query(
    `INSERT INTO questions (product_id, question_body, date_written, asker_name, asker_email, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6)`, options
  )
  .then((data) => {
    // console.log('data', data)
    res.status(204)
  })
  .catch((err) => {
    console.log('i cannot add questions', err)
    res.status(404).send(err)
  })
}

//http://localhost:3000/qa/questions/1/answers
exports.addAnswer = (req, res) => {
    // console.log('param?', req.params.question_id)
    // console.log('req body', JSON.stringify(req.body))
    let options = [req.params.question_id, req.body.body, req.body.name, req.body.email, 0]
    connectDb.query(
    `INSERT INTO answers (question_id, body, answerer_name, answerer_email, helpful) VALUES ($1, $2, $3, $4, $5) RETURNING id`, options
  )
  .then((data) => {
    // console.log('data', data)

    // `INSERT INTO answers_photos (answer_id, url) VALUES (${data.rows[0].id}, (json_array_elements_text(${JSON.stringify(req.body.photos)})))`
    // console.log('ty', req.body.photos)
    if (req.body.photos.length > 0) {
      let parsed = req.body.photos.split(',')

    // console.log('p', parsed)

      parsed.forEach((photo) => {
        let options2 = [data.rows[0].id, photo]
        connectDb.query(
          `INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2)`, options2
            // `INSERT INTO answers_photos (answer_id, url) VALUES (${data.rows[0].id}, ${photo})`
        )
        .catch((err2) => {
          console.log('this is err2', err2)
          res.status(404).send(err)
        })
      })
    }
    // parsed.forEach((photo) => {
    //   let options2 = [data.rows[0].id, photo]
    //   connectDb.query(
    //     `INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2)`, options2
    //       // `INSERT INTO answers_photos (answer_id, url) VALUES (${data.rows[0].id}, ${photo})`
    //   )
    //   .catch((err2) => {
    //     console.log('this is err2', err2)
    //   })
    // })
    res.status(201)
  })
  .catch((err) => {
    console.log('i cannot add answers', err)
})
}

//http://localhost:3000/qa/questions/:question_id/helpful
exports.questionHelpful = (req, res) => {
  connectDb.query(
    `SELECT * from questions where question_id = ${req.params.question_id}`
  )
  .then((data) => {
    // console.log('data', data.rows[0].question_helpfulness)
    let increaseHelpfulness = data.rows[0].question_helpfulness += 1;
    connectDb.query(
      `UPDATE questions SET question_helpfulness = ${increaseHelpfulness} where question_id = ${req.params.question_id}`
    )
    .then((data2) => {
      res.status(204)
    })
    .catch((err2) => {
      console.log('err2', err2)
    })
  })
  .catch((err) => {
    console.log('i cannot update question helpfulness', err)
    res.status(400).send(err)
  })
}

exports.questionReport = (req, res) => {
  connectDb.query(
    `SELECT * from questions where question_id = ${req.params.question_id}`
  )
  .then((data) => {
    // console.log('data', data.rows[0].reported)
    connectDb.query(
      `UPDATE questions SET reported = ${true} where question_id = ${req.params.question_id}`
    )
    .then((data2) => {
      res.status(204)
    })
    .catch((err2) => {
      console.log('err2', err2)
    })
  })
  .catch((err) => {
    console.log('i cannot report', err)
    res.status(400).send(err)
  })
}

exports.answerHelpful = (req, res) => {
  connectDb.query(
    `SELECT * from answers where id = ${req.params.answer_id}`
  )
  .then((data) => {
    // console.log('data here', data)
    let increaseHelpfulness = data.rows[0].helpful += 1;
    connectDb.query(
      `UPDATE answers SET helpful = ${increaseHelpfulness} where id = ${req.params.answer_id}`
    )
    .then((data2) => {
      res.status(204)
    })
    .catch((err2) => {
      console.log('err2', err2)
      res.status(400).send(err)
    })
  })
  .catch((err) => {
    console.log('i cannot update answer helpfulness', err)
  })
}

exports.answerReport = (req, res) => {
  connectDb.query(
    `SELECT * from answers where id = ${req.params.answer_id}`
  )
  .then((data) => {
    // console.log('data', data.rows[0].reported)
    connectDb.query(
      `UPDATE answers SET reported = ${true} where id = ${req.params.answer_id}`
    )
    .then((data2) => {
      res.status(204)
    })
    .catch((err2) => {
      console.log('err2', err2)
      res.status(400).send(err2)
    })
  })
  .catch((err) => {
    console.log('i cannot report', err)
    res.status(400).send(err)
  })
}


// connectDb.query(`SELECT * FROM questions where product_id = ${req.query.product_id}`)
// .then((data) => {
//   // res.send({product_id: req.query.product_id, results: data.rows})
//   data.rows.forEach((question) => {
//     // console.log('q', question.question_id)
//     connectDb.query(`SELECT * FROM answers where question_id = ${question.question_id}`)
//     .then((answers) => {
//       question.answers = {};
//       question.answers.photos = [];

//       answers.rows.forEach((answer) => {
//         console.log('ans', answer)
//         Object.assign(question.answers, answer)
//         connectDb.query(`SELECT * FROM answers_photos where answer_id = ${answer.id}`)
//         .then((photos) => {
//           console.log('weve made it', photos.rows)
//           if (photos.rows) {
//             photos.rows.forEach((photo) => {
//               console.log('foto', question.answers.photos)
//               question.answers.photos.push(photo.url)
//             })
//           }
//         res.send({product_id: req.query.product_id, results: data.rows})
//         })
//         .catch((err) => {
//           console.log('i cannot find photos')
//         })
//       })
//     })
//     .catch((err) => {
//       console.log('i cannot find answers', err)
//     })
//   })
// })
// .catch((err) => {
//   console.log('i cannot find questions', err)
// })


// `SELECT json_build_object('product_id', 3,'results', (WITH res AS (SELECT * from questions WHERE product_id = 3 LIMIT 5 OFFSET 1) SELECT json_agg(json_build_object('question_id', res.question_id, 'question_body', res.question_body, 'question_date', res.date_written, 'asker_name', res.asker_name, 'question_helpfulness', res.question_helpfulness,'reported', res.reported, 'answers', COALESCE((SELECT json_object_agg(answers.id, json_build_object('id', answers.id, 'body', answers.body, 'date', answers.date_written, 'answerer_name', answers.answerer_name, 'helpfulness', answers.helpful, 'photos', COALESCE((SELECT json_agg(json_build_object('id', answers_photos.id, 'url', answers_photos.url)) FROM answers_photos WHERE answers_photos.answer_id = answers.id), '[]'))) FROM answers WHERE answers.question_id = res.question_id), '{}'))) FROM res);`


// SELECT json_build_object(
//   'product_id', 900009,
//   'results', (WITH res AS (SELECT * from questions WHERE product_id = 900009 LIMIT 5 OFFSET 1)
//     SELECT json_agg(json_build_object(
//       'question_id', res.question_id,
//       'question_body', res.question_body,
//       'question_date', res.date_written,
//       'asker_name', res.asker_name,
//       'question_helpfulness', res.question_helpfulness,
//       'reported', res.reported,
//       'answers', COALESCE((SELECT json_object_agg(answers.id, json_build_object(
//         'id', answers.id,
//         'body', answers.body,
//         'date', answers.date_written,
//         'answerer_name', answers.answerer_name,
//         'helpfulness', answers.helpful,
//         'photos', COALESCE((SELECT json_agg(json_build_object(
//           'id', answers_photos.id,
//           'url', answers_photos.url
//         ))
//         FROM answers_photos WHERE answers_photos.answer_id = answers.id), '[]')
//       ))
//       FROM answers WHERE answers.question_id = res.question_id), '{}')
//     )) FROM res
//   ));