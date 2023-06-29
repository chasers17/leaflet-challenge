function createEarthquakeMap() {
  const map = L.map('map').setView([37.09, -95.71], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
  d3.json(url).then(function (data) {

    function getMarkerSize(magnitude) {
      return magnitude * 5;
    }

    function getMarkerColor(depth) {
      if (depth > 90) {
        return '#ff08a8'; 
      } else if (depth > 70) {
        return '#c772ff'; 
      } else if (depth > 50) {
        return '#1dabff'; 
      } else if (depth > 30) {
        return '#00d2ff'; 
      } else if (depth > 10) {
        return '#00edff';
      } else {
        return '#14ffdc'; 
      }
    }

    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        
        return L.circleMarker(latlng, {
          radius: getMarkerSize(feature.properties.mag),
          fillColor: getMarkerColor(feature.geometry.coordinates[2]),
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
      }
    }).addTo(map);
  });
}

createEarthquakeMap();
