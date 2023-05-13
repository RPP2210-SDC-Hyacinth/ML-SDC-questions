import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {

     duration: '1m', VUs: 500

};


// question ID
// let min = 3167079;
// let max = 3518977;

// let id = Math.floor(Math.random() * (max - min + 1) + min);

//http://localhost:3000/qa/questions/1/answers/?count=5&page=3

// test for post to qa - UNCOMMENT BELOW
// export default function () {

//   const url = 'http://localhost:3000/qa/questions/';

//   let min = 900009;
//   let max =  1000011;
//   let id = Math.floor(Math.random() * (max - min + 1) + min);


//   let data = JSON.stringify({
//     product_id: id,
//     body: 'hello k6 test with 600 users',
//     name: 'midk6',
//     email: 'mid@mid'
//   })

//   // console.log('id', data)
//   const res = http.post(url, data, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   res.json()
//   check(res, {'status was 200': (r) => r.status === 200})
//   sleep(1);
// }

// test for post to answers

export default function () {

let min = 3167079;
let max = 3518977;

  let id = Math.floor(Math.random() * (max - min + 1) + min);

  const url = `http://localhost:3000/qa/questions/${id}/answers`;


  let data = JSON.stringify({
    body: 'hello k6 ANSWERS test with 500 users',
    name: 'midk6',
    email: 'mid@mid',
    photos: 'url@imagehere.com'
  })

  let params = JSON.stringify({
    question_id: id
  })

  // console.log('id', data)
  const res = http.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.json()
  check(res, {'status was 200': (r) => r.status === 200})
  sleep(1);
}
