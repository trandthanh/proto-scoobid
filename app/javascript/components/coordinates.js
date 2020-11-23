const collectCoordinates = () => {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data);
    });
  }
  setInterval(() => getCurrentLocation(), 2000);
}

export { collectCoordinates };
