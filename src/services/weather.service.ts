import AppError from "../utils/AppError.js";

interface WeatherData {
    city: string;
    main: string;
    description: string;
    temperature: string;
    temperature_min: string;
    temperature_max: string;
    humidity: number;
}

interface CacheEntry extends WeatherData {
    timeStamp: number;
}

const cache: Record<string, CacheEntry> = {};


async function getWeather(city: string) : Promise<WeatherData> { // error: Parameter 'city' implicitly has an 'any' type.

    const timeStamp = Date.now();

    if (cache[city] && (Date.now() - cache[city].timeStamp) < 10 * 60 * 1000) { // error en cache[city] : Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
        const {timeStamp, ...weatherData} = cache[city];
        return weatherData;
    }

    const apiKey = process.env.OPEN_WEATHER_API_KEY;

    console.log("llamando a la api");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    
    const data = await response.json();

    if (Number(data.cod) !== 200) {
        throw new AppError(data.message, Number(data.cod));
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

    cache[city] = {...weatherData, timeStamp}; //error: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.

    return weatherData;
}

function kelvinToCelsius(kelvin: number) :string { // error: Parameter 'kelvin' implicitly has an 'any' type.
    const temp = kelvin - 273.15;
    return `${temp.toFixed(2)} °C`;
}

export default getWeather;