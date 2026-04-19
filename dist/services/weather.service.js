import AppError from "../utils/AppError.js";
const cache = {};
async function getWeather(city) {
    const timeStamp = Date.now();
    if (cache[city] && (Date.now() - cache[city].timeStamp) < 10 * 60 * 1000) { // error en cache[city] : Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
        const { timeStamp, ...weatherData } = cache[city];
        return weatherData;
    }
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    console.log("llamando a la api");
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod !== 200) {
        throw new AppError(data.message, data.cod);
    }
    const weatherData = {
        city: data.name,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temperature: kelvinToCelsius(data.main.temp),
        temperature_min: kelvinToCelsius(data.main.temp_min),
        temperature_max: kelvinToCelsius(data.main.temp_max),
        humidity: data.main.humidity
    };
    cache[city] = { ...weatherData, timeStamp }; //error: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
    return weatherData;
}
function kelvinToCelsius(kelvin) {
    const temp = kelvin - 273.15;
    return `${temp.toFixed(2)} °C`;
}
export default getWeather;
