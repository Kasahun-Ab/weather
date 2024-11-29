import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Background } from './components/Background';
import { CitySearch } from './components/CitySearch';
import { WeatherCard } from './components/WeatherCard';
import { getWeatherData } from './services/weatherService';
import { WeatherData } from './types/weather';
import { WEATHER_API } from './config/constants';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState(WEATHER_API.DEFAULT_CITY);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    const debounceTimeout = setTimeout(fetchWeather, 500);
    return () => clearTimeout(debounceTimeout);
  }, [city]);

  return (
    <div className="min-h-screen text-aurora-text relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <CitySearch city={city} onCityChange={setCity} />
          
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : weatherData && (
            <WeatherCard weatherData={weatherData} city={city} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;