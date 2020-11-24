import { fetchWithToken } from "../utils/fetch_with_token";

const initMapboxCreate = () => {
  const mapElement = document.querySelector("#map-create");

  const userCoordinates = [];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      const newCoordinate = [latitude, longitude];

      // if (newCoordinate != userCoordinates[userCoordinates.length - 1]) {
        userCoordinates.push(newCoordinate);
      // }
    });

    const jsonObject = `{
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': ${userCoordinates}
        }
      }
    }`

    const mapElement = document.querySelector("#map-create");
    const id = mapElement.dataset.id;

    console.log(`/search_attendancies/${id}`);

    if (userCoordinates.length !== 0) {
      fetchWithToken(`/search_attendancies/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ search_attendancy: { itinerary: jsonObject }})
      })
        .then(response => response.json())
        .then((data) => {
          // handle JSON response from server
        });
    }

  }

  if (mapElement) {
    setInterval(() => getCurrentLocation(), 3000);
  }
}

export { initMapboxCreate };
