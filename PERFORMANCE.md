# Performance Testing with k6

This project includes simple k6 scenarios for load and spike testing.

## Prerequisites

- k6 installed locally, or use the Docker image
- Node/Playwright are not required to run k6

## Test scripts

- Load: `tests/performance/load/load-test.js`
- Spike: `tests/performance/spike/spike-test.js`

## Run locally

```bash
k6 run tests/performance/load/load-test.js
k6 run tests/performance/spike/spike-test.js
```

## Run with environment variables

k6 exposes environment variables via `__ENV`.

```bash
k6 run -e BASE_URL=https://example.com tests/performance/load/load-test.js
```

## Run with Docker

```bash
docker run -i grafana/k6 run - < tests/performance/load/load-test.js
```

## Customize

- Stages/VUs: edit the `stages` or `vus/duration` in the script options
- Thresholds: update `thresholds` to enforce SLOs
- Targets/URLs: source from `__ENV` (e.g., `__ENV.BASE_URL`) to keep scripts portable

## Example options block

```javascript
export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 20 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};
```
