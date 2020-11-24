import { fetchWithToken } from "../utils/fetch_with_token";

const initMapboxCreate = () => {
  const mapElement = document.querySelector("#map-create");

  const userCoordinates = [];
  let runInterval = null;

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
          'coordinates': ${JSON.stringify(userCoordinates)}
        }
      }
    }`

    const mapElement = document.querySelector("#map-create");
    const id = mapElement.dataset.id;

    if (userCoordinates.length !== 0) {
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
    }

  }

  const startButton = document.querySelector(".start-button");
  startButton.addEventListener("click", () => {
    runInterval = setInterval(getCurrentLocation, 1000);
  })

  const stopButton = document.querySelector(".stop-button");
  stopButton.addEventListener("click", () => {
    clearInterval(runInterval);
  })
}

export { initMapboxCreate };
