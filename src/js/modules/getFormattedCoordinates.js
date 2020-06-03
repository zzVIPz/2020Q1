const TRANSLATE = {
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

export default function getFormattedCoordinates(lat, lng, language) {
  const latitude = `${TRANSLATE[language][0]}: ${getCoordinatesStr(lat)}`;
  const longitude = `${TRANSLATE[language][1]}: ${getCoordinatesStr(lng)}`;
  return [latitude, longitude];
}
