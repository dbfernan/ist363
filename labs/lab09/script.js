const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current=temperature_2m,precipitation,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch";

fetch(endpoint)
.then(response => response.json())
.then(data => {
    const current = data.current;

    document.getElementById("temperature").textContent =
        "Temperature: " + current.temperature_2m + "°F";

    document.getElementById("precipitation").textContent =
        "Precipitation: " + current.precipitation + " inches";

    if (current.cloud_cover <= 50) {
        document.getElementById("cloudCover").textContent = "☁️";
    } else {
        document.getElementById("cloudCover").textContent = "☀️";
    }

})

.catch(error => {
    console.error("Error:", error);
});