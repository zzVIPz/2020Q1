const TRANSLETE = {
  ru: ['ШИРОТА', 'ДОЛГОТА'],
  en: ['LATITUDE', 'LONGITUDE'],
  be: ['ШЫРАТА', 'ДАЎГАТА'],
};

function getCoordinatesStr(coordinate) {
  const valueArray = String(coordinate).split('.');
  const formattedStr = `${valueArray[0]}° ${valueArray[1].slice(0, 2)}' ${valueArray[1].slice(
    2,
    5,
  )}"`;
  return formattedStr;
}

export default function getFormattedCoordinates(cityInfo, language) {
  const latitude = `${TRANSLETE[language][0]}: ${getCoordinatesStr(cityInfo.lat)}`;
  const longitude = `${TRANSLETE[language][1]}: ${getCoordinatesStr(cityInfo.lng)}`;
  return [latitude, longitude];
}
