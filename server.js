//Server
const express = require('express');
const app = express();
const port = 3000;

//Hardware
const getHumidityReading = require('./humidity-sensor-interface');
const { pumpOn, pumpOff } = require('./pump-interface')

app.use(express.static('dist'));

app.get('/readHumidity', (request, response) => {
  getHumidityReading()
    .then((reading) => {
      response.send('The soil humidity reading from ApplePi is ' + reading)
    })
})

app.get('/pumpOn', (request, response) => {
  pumpOn()
    .then(response.send('Pump switched on'))
})

app.get('/pumpOff', (request, response) => {
  pumpOff()
    .then(response.send('Pump switched off'))
})

app.listen(port, () => console.log(`listening from port: ${port}`));