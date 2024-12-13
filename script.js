const cityValue = document.querySelector('#location');
const temp = document.querySelector('.temperature');
const humidity = document.querySelector('#humidityValue');
const windspeed = document.querySelector('#windspeedValue');
const searchBtn = document.querySelector('#searchButton');
const weatherDescription = document.querySelector('#description');
const imageBox = document.querySelector('#imageBox');
const weatherBox = document.querySelector('#weatherBox');

let weatherData;

async function checkWeather(city) {
    const apiKey = '5cedf9a8c1e9c8b33c21f7d475204f84';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        weatherData = await fetch(url)
            .then((response) => {
                return response.json();
            })
    } catch (error) {
        console.log('Error', error);

    }


    console.log(weatherData);
    if (weatherData.main) {

        let kelvin = weatherData.main.temp;
        let tempCelcius = (kelvin - 273.15);
        temp.innerText = `${tempCelcius.toFixed(2)} °C`;
        weatherDescription.innerText = weatherData.weather[0].main;
        humidity.innerText = `${weatherData.main.humidity}`;
        windspeed.innerText = `${weatherData.wind.speed}`;

        let weatherDescriptions = weatherData.weather[0].main;

        switch (weatherDescriptions) {
            case 'Clouds':
                imageBox.style.backgroundImage = 'url(assets/cloud.png';
                break;

            case 'Haze':
                imageBox.style.backgroundImage = 'url(assets/mist.png';
                break;

            case 'Rain':
                imageBox.style.backgroundImage = 'url(assets/rain.png';
                break;

            case 'Smoke':
                imageBox.style.backgroundImage = 'url(assets/snow.png';
                break;

            case 'Clear':
                imageBox.style.backgroundImage = 'url(assets/clear.png';
                break;
            default:
                break;
        }

    } else {
        imageBox.style.backgroundImage = 'url(assets/404.png';
        weatherDescription.innerText = 'Please enter valid Inputs';
        humidity.innerText = '';
        windspeed.innerText = '';
        temp.innerText='';
    }




}



searchBtn.addEventListener('click', () => {
    checkWeather(cityValue.value);

})


