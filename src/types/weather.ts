export interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  hourlyForecast: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  humidity: number;
}

export interface ApiWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}