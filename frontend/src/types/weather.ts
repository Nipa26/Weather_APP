export interface WeatherData {
  name: string;

  sys: {
    country: string;
  };

  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };

  wind: {
    speed: number;
  };

  weather: {
    description: string;
    icon: string;
  }[];
}