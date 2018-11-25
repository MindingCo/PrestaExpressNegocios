window.onload = function () {
  var map = L.map('mapita').setView([51.505, -0.09], 3);

  const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

  const tile = L.tileLayer(tileURL2);

  // Socket Io
  var socket2 = io('http://31.220.53.147:8081', {forceNew: true})

  // Marker
  const marker = L.marker([19.45315,-99.1750]); // CDMX, Popotla
  marker.bindPopup('Usted se encuentra aqui!');
  map.addLayer(marker);

  // Geolocation
  map.locate({enableHighAccuracy: true})
  map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const newMarker = L.marker(coords);
    newMarker.bindPopup('You are Here!');
    map.addLayer(newMarker);
    socket2.emit('userCoordinates', e.latlng);
  });

  // socket new User connected
  socket2.on('newUserCoordinates', (coords) => {
    console.log(coords);
    const userIcon = L.icon({
      iconUrl: '/img/icon2.png',
      iconSize: [38, 42],
    })
    const newUserMarker = L.marker([coords.lat, coords.lng], {
      icon: userIcon
    });
    newUserMarker.bindPopup('New User!');
    map.addLayer(newUserMarker);
  });

  map.addLayer(tile);
}
