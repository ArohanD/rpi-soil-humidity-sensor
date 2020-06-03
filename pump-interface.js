var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var Pump = new Gpio(4, 'high'); //use GPIO pin 4, and specify that it is output

const pumpOn = () => Pump.write(0);
const pumpOff = () => Pump.write(1);

module.exports = { pumpOn, pumpOff }
