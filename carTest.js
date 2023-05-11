import http from 'k6/http';
import ( check, sleep ) from 'k6';

export const options = {
  scenarios: {
    discardResponseBodies: true,
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      // starts 30 iteration per timeUnit or 1 second
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      //duration launches every 30s
      duration: '30s',
      preAllocatedVUs: 2, // how large the initial pool of VUs would be, what is available to the test at the beginning
      maxVUs: 50, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  http.get('https://localhost:3000/qa/questions');
  sleep(1);
}
