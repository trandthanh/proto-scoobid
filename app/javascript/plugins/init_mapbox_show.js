import mapboxgl from 'mapbox-gl';

const createItinerary = (map, itinerary, color) => {
  map.addSource("route", JSON.parse(itinerary));

  map.addLayer({
    'id': "route",
    'type': 'line',
    'source': "route",
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': color,
      'line-width': 4
    }
  });
};

const initMapboxShow = () => {
  const mapElement = document.getElementById('map-show');
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map-show',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-122.49369693756104, 37.84381888486939],
      zoom: 10
    });

    const itinerary = JSON.parse(mapElement.dataset.itinerary);

    map.on('load', function () {
      const coordinates = itinerary.features[0].geometry.coordinates;
      itinerary.features[0].geometry.coordinates = [coordinates[0]];

      map.addSource('trace', { type: 'geojson', data: itinerary });
        map.addLayer({
        'id': 'trace',
        'type': 'line',
        'source': 'trace',
        'paint': {
        'line-color': 'yellow',
        'line-opacity': 0.75,
        'line-width': 5
        }
      });

      map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
      map.setPitch(30);

      var i = 0;
      var timer = window.setInterval(function () {
        if (i < coordinates.length) {
          itinerary.features[0].geometry.coordinates.push(coordinates[i]);
          map.getSource('trace').setData(itinerary);
          map.panTo(coordinates[i]);
          i++;
        } else {
          window.clearInterval(timer);
        }
      }, 100);
    })
  };
};

export { initMapboxShow };
