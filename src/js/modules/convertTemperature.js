function convertCtoF(celsius) {
  const fahrenheit = Math.round(celsius * (9 / 5) + 32);
  return fahrenheit;
}

function convertFtoC(fahrenheit) {
  const celsius = Math.round((5 / 9) * (fahrenheit - 32));
  return celsius;
}

export default function convertTemperature(temperature, nodes) {
  if (temperature === 'f') {
    nodes.forEach((tag) => {
      const value = tag;
      value.innerText = convertCtoF(value.innerText);
    });
  } else {
    nodes.forEach((tag) => {
      const value = tag;
      value.innerText = convertFtoC(value.innerText);
      return null;
    });
  }
}
