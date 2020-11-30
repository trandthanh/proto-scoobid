import { fetchWithToken } from "../utils/fetch_with_token";
import mapboxgl from 'mapbox-gl';

const initMapboxCreate = () => {
  const mapElement = document.querySelector("#map-create");

  let runInterval = null;
  let runMapInterval = null;

  const userCoordinates = [];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      const newCoordinate = [longitude, latitude];
      console.log(userCoordinates);
      // if (newCoordinate != userCoordinates[userCoordinates.length - 1]) {
        userCoordinates.push(newCoordinate);
      // }
    });

    const jsonObject = {
      'type': "FeatureCollection",
      'features': [
        {
          'type': "Feature",
          'geometry': {
            'type': "LineString",
            'coordinates': ${JSON.stringify(userCoordinates)}
          }
        }
      ]
    };

    const mapElement = document.querySelector("#map-create");
    const id = mapElement.dataset.id;

    //if (userCoordinates.length !== 0) {
      fetchWithToken(`/api/v1/search_attendancies/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ search_attendancy: { itinerary: jsonObject }})
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
        });

      const coordinates = userCoordinates;
    //}

  };

  const showCurrentTrace = (map) => {
    const mapElement = document.querySelector("#map-create");
    const id = mapElement.dataset.id;

    fetchWithToken(`/api/v1/search_attendancies/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.itinerary);
        console.log(JSON.parse(data.itinerary));
        // const coordinates = itinerary.features[0].geometry.coordinates;
        // itinerary.features[0].geometry.coordinates = [coordinates[0]];

        // map.addSource('trace', { type: 'geojson', data: itinerary });
        // map.addLayer({
        //   'id': 'trace',
        //   'type': 'line',
        //   'source': 'trace',
        //   'paint': {
        //     'line-color': 'yellow',
        //     'line-opacity': 0.75,
        //     'line-width': 5
        //   }
        // });

        // map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
        // map.setPitch(30);

        // var i = 0;
        // var timer = window.setInterval(function () {
        //   if (i < coordinates.length) {
        //     itinerary.features[0].geometry.coordinates.push(coordinates[i]);
        //     map.getSource('trace').setData(itinerary);
        //     map.panTo(coordinates[i]);
        //     i++;
        //   } else {
        //     window.clearInterval(timer);
        //   }
        // }, 100);
      });
  }

  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  const map = new mapboxgl.Map({
    container: 'map-create',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [2.3789568, 48.866918399999996],
    zoom: 15
  });

  const startButton = document.querySelector(".start-button");
  startButton.addEventListener("click", (event) => {

    runInterval = setInterval(getCurrentLocation, 1000);

    runMapInterval = setInterval(showCurrentTrace, 3000);
    // showCurrentTrace();
  })

  const stopButton = document.querySelector(".stop-button");
  stopButton.addEventListener("click", () => {
    clearInterval(runInterval);
    clearInterval(runMapInterval);
  })
}

export { initMapboxCreate };
