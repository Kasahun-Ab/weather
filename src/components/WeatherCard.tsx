import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeatherCardProps {
  weatherData: WeatherData;
  city: string;
}

export function WeatherCard({ weatherData, city }: WeatherCardProps) {
  const weatherMetrics = [
    {
      label: 'Feels Like',
      value: `${Math.round(weatherData.feelsLike)}°C`,
      icon: '🌡️'
    },
    {
      label: 'Humidity',
      value: `${weatherData.humidity}%`,
      icon: '💧'
    },
    {
      label: 'Wind Speed',
      value: `${weatherData.windSpeed} m/s`,
      icon: '💨'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-3xl p-8 shadow-lg text-white"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-aurora-accent"
        >
          Weather in {city}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center animate-float">
            <WeatherIcon condition={weatherData.condition} size="large" />
            <div className="text-6xl font-light mb-2">
              {weatherData.temperature}°C
            </div>
            <div className="text-xl text-aurora-accent capitalize">
              {weatherData.condition}
            </div>
            <p className="text-sm text-gray-400 mt-1 capitalize">
              {weatherData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {weatherMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-aurora-card rounded-xl p-4 hover:bg-opacity-70 transition-all duration-300"
              >
                <span className="text-2xl">{metric.icon}</span>
                <div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                  <div className="text-lg font-semibold">{metric.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 shadow-lg text-white"
      >
        <h3 className="text-xl font-semibold mb-4 text-aurora-accent">Hourly Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {weatherData.hourlyForecast.map((forecast, index) => (
            <motion.div
              key={forecast.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 rounded-xl hover:bg-aurora-card transition-colors"
            >
              <div className="text-sm text-gray-400 mb-1">{forecast.time}</div>
              <WeatherIcon condition={forecast.condition} size="small" />
              <div className="text-sm font-medium">{forecast.temperature}°</div>
              <div className="text-xs text-gray-400">{forecast.humidity}%</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}