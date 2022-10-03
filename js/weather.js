const apiKey = "6183ede128145142bcfd47213f729f4b";   // Nhập key lấy từ openweathermap.org
let city = "ho chi minh";
renderWeather(city);

function renderWeather(city) {
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&units=metric&appid=${apiKey}`
        )
        .then(function (response) {
            const data = response.data;
            document.getElementById("cloud").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("loading").innerText = `\
        ${data.name}, ${data.sys.country}
        Thời tiết: ${data.weather[0].description}
        Nhiệt độ: ${data.main.temp}\u00B0C
        Độ ẩm: ${data.main.humidity}%
        Sức gió: ${data.wind.speed}km/h
        `})
}

document.getElementById("search-btn").addEventListener("click", function () {
    let city = document.getElementById("search-bar").value;
    renderWeather(city);
    document.getElementById("search-bar").value = "";
});

document.getElementById("search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});
