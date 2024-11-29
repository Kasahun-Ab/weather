import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ETHIOPIAN_CITIES } from '../config/constants';

interface CitySearchProps {
  city: string;
  onCityChange: (city: string) => void;
}

export function CitySearch({ city, onCityChange }: CitySearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (city.length > 0) {
      const filtered = ETHIOPIAN_CITIES.filter(c => 
        c.toLowerCase().includes(city.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search Ethiopian cities..."
          className="w-full px-4 py-3 text-lg rounded-xl glass-effect text-white placeholder-gray-400 border border-aurora-accent/20 focus:outline-none focus:border-aurora-accent transition-all"
        />
        
        <AnimatePresence>
          {isFocused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 py-2 glass-effect rounded-xl shadow-lg z-50"
            >
              {suggestions.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  onClick={() => onCityChange(suggestion)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-aurora-card transition-colors"
                  whileHover={{ x: 10 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}