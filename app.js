
'use strict';

// Set up Express
const express = require('express');
const app = express();
const port = 3000;

// Use the prom-client and express-prom-bundle modules to expose our metrics to Prometheus
// express-prom-bundle exposes '/metrics' point by default
const client = require('prom-client');
const promBundle = require('express-prom-bundle');

// Use calc library
var calc = require('./calc.js');

// Custom Prometheus metrics
const totalRequests = new client.Counter({
  name: 'tm_calc_total_requests',
  help: 'Total number of requests',
  labelNames: ['route']
});

const totalRequestErrors = new client.Counter({
  name: 'tm_calc_total_request_errors',
  help: 'Total number of request errors',
  labelNames: ['route']
});

// These go before express-prom-bundle is initiated because
// we don't want to monitor their requests
app.get('/liveness', (req, res) => {
  res.send("I'm alive!");
});

app.get('/readiness', (req, res) => {
  res.send("I'm ready!");
});

// Use builtin latency metrics from express-prom-bundle
app.use('/*', promBundle({includePath: true}));

// Let's get mathing!
app.get('/', (req, res) => {

  // Count requests
  totalRequests.inc({
    route: '/'
  });

  res.send('A simple Node.js/ExpressJS based calculator app, with Prometheus metrics.');
});

app.get('/add/:num1/:num2', (req, res) => {
  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);
  let sum = calc.addNumbers(num1,num2);

  // Count requests
  totalRequests.inc({
    route: '/add'
  });

  res.send(sum.toString());
});

app.get('/subtract/:num1/:num2', (req, res) => {
  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);
  let diff = calc.subNumbers(num1,num2);

  // Count requests
  totalRequests.inc({
    route: '/subtract'
  });

  res.send(diff.toString());
})

app.get('/division/:num1/:num2', (req, res) => {
  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);
  let quot = calc.divNumbers(num1,num2);

  // Count requests
  totalRequests.inc({
    route: '/division'
  });

  res.send(quot.toString());
})

app.get('/random', (req, res) => {
  let random_nums = calc.ranNumbers();

  // Count requests
  totalRequests.inc({
    route: '/random'
  });

  res.send(random_nums);
})

app.get('/random/:num', (req, res) => {
  let random_nums = calc.ranNumbers(req.params.num);

  // Count requests
  totalRequests.inc({
    route: '/random'
  });

  res.send(random_nums);
})

app.get('/*', (req, res) => {

  totalRequestErrors.inc({
    // Log actual path of errors for later analysis
    route: req.path
  });

  res.status(500).send("There was an error!");
})

app.listen(port, () => {
  console.log(`Simple calculator app listening at http://localhost:${port}`);
});
