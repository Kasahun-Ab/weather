import axios from 'axios';
import { WEATHER_API } from '../config/constants';
import { WeatherData, ApiWeatherResponse } from '../types/weather';
import { formatHourlyTime } from '../utils/dateUtils';

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get<ApiWeatherResponse>(`${WEATHER_API.BASE_URL}/weather`, {
        params: {
          q: city,
          appid: WEATHER_API.KEY,
          units: 'metric',
        },
      }),
      axios.get(`${WEATHER_API.BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: WEATHER_API.KEY,
          units: 'metric',
        },
      }),
    ]);

    const current = currentWeatherResponse.data;
    const forecast = forecastResponse.data;

    const weatherData: WeatherData = {
      temperature: Math.round(current.main.temp),
      condition: current.weather[0].main,
      description: current.weather[0].description,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      feelsLike: Math.round(current.main.feels_like),
      hourlyForecast: forecast.list.slice(0, 5).map((item: any) => ({
        time: formatHourlyTime(item.dt),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
        humidity: item.main.humidity,
      })),
    };

    return weatherData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
    throw new Error('Failed to fetch weather data');
  }
}