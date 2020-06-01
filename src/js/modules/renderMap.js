L.mapbox.accessToken =
  'pk.eyJ1Ijoienp2aXB6IiwiYSI6ImNrYXN3a2RpejA0anoycHA4d29oMDRjYWsifQ.YtKlezGJbyQRhADhwZb9KQ';
let map = null;

export default function renderMap(location) {
  const coordinates = location.split(',');
  if (map) {
    map.remove();
  }
  map = L.mapbox
    .map('map')
    .setView([coordinates[0], coordinates[1]], 9)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
  L.marker([coordinates[0], coordinates[1]]).addTo(map);
}
