import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    spike: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 500 }, // 🚀 instant-ish jump to 500 users
        { duration: '2m', target: 500 },  // hold the spike for 2 minutes
        { duration: '30s', target: 0 },   // sudden drop back to 0
      ],
      gracefulRampDown: '10s', // let VUs finish cleanly
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% requests < 500ms
    http_req_failed: ['rate<0.1'],    // <10% failure allowed
  },
};

export default function () {
  const res = http.get('https://httpbin.org/get');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'under 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // small breather per VU
}
