import mapboxgl from 'mapbox-gl';

const createItinerary = (map, itinerary, colors, i) => {
  map.addSource(`route${i}`, JSON.parse(itinerary));

  map.addLayer({
    'id': `route${i}`,
    'type': 'line',
    'source': `route${i}`,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': colors[i],
      'line-width': 4
    }
  });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-122.486052, 37.830348],
      zoom: 15
    });

    const itineraries = JSON.parse(mapElement.dataset.itineraries);
    const colors = JSON.parse(mapElement.dataset.colors);
    map.on('load', function () {
      let i = 0;
      itineraries.forEach((itinerary) => {
        createItinerary(map, itinerary, colors, i);
        i += 1;
      });
    });
  }
};

export { initMapbox };
