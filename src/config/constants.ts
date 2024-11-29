export const WEATHER_API = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  KEY: "7a0274c69473d6e4224e403e1426b839",
  DEFAULT_CITY: "Addis Ababa",
} as const;

export const ETHIOPIAN_CITIES = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Bahir Dar",
  "Hawassa",
  "Adama",
  "Jimma",
  "Dessie",
  "Jijiga",
] as const;