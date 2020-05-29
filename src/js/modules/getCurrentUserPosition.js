function success(pos) {
  let crd = pos.coords;

  console.log('Ваше текущее метоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
  return crd;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default navigator.geolocation.getCurrentPosition(success, error);
