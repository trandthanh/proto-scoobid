import mapboxgl from 'mapbox-gl';

const initMapboxShow = () => {
  const mapElement = document.getElementById('map-show');
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map-show',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-122.486052, 37.830348],
      zoom: 15
    });
  }
};

export { initMapboxShow };
