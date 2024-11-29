import { getWeatherIcon } from '../utils/weatherUtils';

interface WeatherIconProps {
  condition: string;
  size: 'small' | 'large';
}

export function WeatherIcon({ condition, size }: WeatherIconProps) {
  const sizeClass = size === 'large' ? 'text-6xl mb-4' : 'text-2xl mb-1';

  return (
    <div className={sizeClass}>
      {getWeatherIcon(condition)}
    </div>
  );
}