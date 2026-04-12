const cache = {}

async function getWeather(city) {

    const timeStamp = Date.now();

    if (cache[city] && (Date.now() - cache[city].timeStamp) < 10 * 60 * 1000) {
        const {timeStamp, ...weatherData} = cache[city];
        return weatherData;
    }

    const apiKey = process.env.OPEN_WEATHER_API_KEY;

    console.log("llamando a la api");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    
    const data = await response.json();

    if (data.cod !== 200) {
        const error = new Error(data.message);
        error.status = 404;
        throw error;
    }

    const weatherData = {
        city: data.name,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temperature: kelvinToCelsius(data.main.temp),
        temperature_min: kelvinToCelsius(data.main.temp_min),
        temperature_max: kelvinToCelsius(data.main.temp_max),
        humidity: data.main.humidity
    }

    cache[city] = {...weatherData, timeStamp};

    return weatherData;
}

function kelvinToCelsius(kelvin) {
    const temp = kelvin - 273.15;
    return `${temp.toFixed(2)} °C`;
}

export default getWeather;