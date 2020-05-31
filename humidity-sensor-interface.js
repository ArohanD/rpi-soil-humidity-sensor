const mcpadc = require('mcp-spi-adc');

const airValue = 0.8582600195503421; // Sensor indoors in air
const waterValue = 0.396871945259042; // Sensor submerged in tap water

const convertVotageToPercentage = (reading) => {
  const range = airValue - waterValue;
  //return reading
  const decimal = (airValue - reading) / range;
  return Math.round(decimal * 100)
}

const humiditySensor = mcpadc.open(0, { speedHz: 20000 }, err => {
  if (err) throw err;

  humiditySensor.read((err, reading) => {
    if (err) throw err;

    const percentage = convertVotageToPercentage(reading.value) + '%';
  });
});

const createDeviceAndExecuteFunction = (func) => {
  return new Promise((resolve, reject) => {
    const device = mcpadc.open(0, { speedHz: 20000 }, err => {
      if(err) reject(err)
      resolve(func(device))
    })
  })
}

const getReading = (device) => {
  return new Promise((resolve, reject) => {
    device.read((err, reading) => {
      if (err) reject(err)

      resolve(convertVotageToPercentage(reading.value));
    })
  })
}

const getHumidityReading = () => createDeviceAndExecuteFunction(getReading);

module.exports = getHumidityReading;
