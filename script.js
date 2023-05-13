import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {

//      duration: '1m', VUs: 500

// };

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 980 },
    { duration: '50s', target: 0 },
  ],
};

// product ID
// let min = 900009;
// let max =  1000011;

// question ID
let min = 3167079;
let max = 3518977;

let id = Math.floor(Math.random() * (max - min + 1) + min);

//get Q's
//`http://localhost:3000/qa/questions?product_id=${id}&count=5&page=1`

export default function () {
  const res = http.get(`http://localhost:3000/qa/questions/${id}/answers/?count=5&page=1`);
  check(res, {'status was 200': (r) => r.status === 200})
  sleep(1);
}

// POST Routes