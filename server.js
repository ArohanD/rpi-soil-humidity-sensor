//Server
const express = require('express');
const app = express();
const port = 3000;

//Sensors
const getHumidityReading = require('./humidity-sensor-interface');

app.use(express.static('dist'));

app.get('/readHumidity', (request, response) => {
  getHumidityReading()
  .then((reading) => {
    response.send('The soil humidity reading from ApplePi is ' + reading)
  })
})

app.listen(port, () => console.log(`listening from port: ${port}`));