function convertCtoF(celsius) {
  const fahrenheit = Math.round(celsius * (9 / 5) + 32);
  return fahrenheit;
}

function convertFtoC(fahrenheit) {
  const celsius = Math.round((5 / 9) * (fahrenheit - 32));
  return celsius;
}

export default function convertTemperature(temperature, value) {
  let convertedValue = value;
  if (temperature === 'f') {
    convertedValue = convertCtoF(value);
    return convertedValue;
  }
  convertedValue = convertFtoC(value);
  return convertedValue;
}
