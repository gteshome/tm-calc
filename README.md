# tm-calc
## A simple Node.js/ExpressJS based calculator app with Prometheus metrics.

### What can it do?
tm-calc either returns the results of a mathematical operation or provides metric information about itself. Once deployed (see Running), point your browser to http://hostname:3000 and query any of these paths (replace `num`, `num1`, and `num2` with your own numbers):

`/` shows a description of the app

`/add/num1/num2` returns the sum of `num1` and `num2`

`/subtract/num1/num2` returns the difference of `num1` and `num2`

`/division/num1/num2` returns the quotient of `num1` and `num2`

`/random` returns ten random numbers

`/random/num` returns `num` random numbers

`/metrics` returns Prometheus metrics

`/readiness` returns 200 if the app is ready to take requests

`/liveness` returns 200 if the app is alive and responding to requests

## Building
To build tm-calc, simply run `npm install` at the top level directory

```bash
cd tm-calc/
npm install
```

## Running
### Local/testing
```bash
cd tm-calc/
node app.js
```

### Docker
```bash
docker run gteshome/tm-calc:0.0.2
```

The app runs on port `3000/tcp` within the container so you might need to use `-p/--expose` to have it reachable on your network.

### Kubernetes
```bash
kubectl apply -f 
``` 
the Kubernetes manifest files under `tm-calc/k8s/`

## Unit testing

```bash
cd tm-calc/
npm test
```