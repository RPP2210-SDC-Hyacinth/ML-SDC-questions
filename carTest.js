import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // discardResponseBodies: true,
  scenarios: {
    contacts:{
        executor: 'constant-arrival-rate',
        // starts 30 iteration per timeUnit or 1 second
        rate: 300,
        timeUnit: '1s', // 500 iterations per second, i.e. 500 RPS
        //duration launches every 1m
        duration: '2m',
        preAllocatedVUs: 2, // how large the initial pool of VUs would be, what is available to the test at the beginning
        maxVUs: 700, // if the preAllocatedVUs are not enough, we can initialize more
      },

  },
};

//GET ROUTES

//GET Q's
//`http://localhost:3000/qa/questions?product_id=${id}&count=5&page=1`

export default function () {
let min = 900009;
let max =  1000011;

  let id = Math.floor(Math.random() * (max - min + 1) + min);
    const res = http.get(`http://localhost:3001/qa/questions?product_id=${id}`);
    check(res, {'status was 200': (r) => r.status === 200})
    sleep(1);
  }
//GET Answers

// export default function () {
// let min = 3167079;
// let max = 3518977;

// let id = Math.floor(Math.random() * (max - min + 1) + min);
//   const res = http.get(`http://localhost:3000/qa/questions/${id}/answers/?count=5&page=1`);
//   check(res, {'status was 200': (r) => r.status === 200})
//   sleep(1);
// }



// POST ROUTES
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

// export default function () {

//   let min = 3167079;
//   let max = 3518977;

//     let id = Math.floor(Math.random() * (max - min + 1) + min);

//     const url = `http://localhost:3000/qa/questions/${id}/answers`;


//     let data = JSON.stringify({
//       body: 'hello k6 ANSWERS test with 500 users',
//       name: 'midk6',
//       email: 'mid@mid',
//       photos: 'url@imagehere.com'
//     })

//     let params = JSON.stringify({
//       question_id: id
//     })

//     // console.log('id', data)
//     const res = http.post(url, data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     res.json()
//     check(res, {'status was 200': (r) => r.status === 200})
//     sleep(1);
//   }

//PUT ROUTES

// QA HELPFULNESS

// export default function () {

//   let min = 3167079;
//   let max = 3518977;

//     let id = Math.floor(Math.random() * (max - min + 1) + min);

//     const url = `http://localhost:3000/qa/questions/${id}/helpful`;

//     let params = JSON.stringify({
//       question_id: id
//     })

//     const res = http.put(url, params, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     res.json()
//     check(res, {'status was 200': (r) => r.status === 200})
//     sleep(1);
//   }

  // QA REPORT

  // export default function () {

  //   let min = 3167079;
  //   let max = 3518977;

  //     let id = Math.floor(Math.random() * (max - min + 1) + min);

  //     const url = `http://localhost:3000/qa/questions/${id}/report`;

  //     let params = JSON.stringify({
  //       question_id: id
  //     })

  //     const res = http.put(url, params, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     res.json()
  //     check(res, {'status was 200': (r) => r.status === 200})
  //     sleep(1);
  //   }

// Answers Helpful

// export default function () {

//   let min = 6384751;
//   let max = 7094168;

//     let id = Math.floor(Math.random() * (max - min + 1) + min);

//     const url = `http://localhost:3000/qa/answers/${id}/helpful`;

//     let params = JSON.stringify({
//       answer_id: id
//     })

//     const res = http.put(url, params, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     res.json()
//     check(res, {'status was 200': (r) => r.status === 200})
//     sleep(1);
//   }



// //Answers Report

// export default function () {

//   let min = 6384751;
//   let max = 7094168;

//     let id = Math.floor(Math.random() * (max - min + 1) + min);

//     const url = `http://localhost:3000/qa/answers/${id}/report`;

//     let params = JSON.stringify({
//       answer_id: id
//     })

//     const res = http.put(url, params, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     res.json()
//     check(res, {'status was 200': (r) => r.status === 200})
//     sleep(1);
//   }

