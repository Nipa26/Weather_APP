import { WiHumidity, WiStrongWind } from "react-icons/wi";
import type { WeatherData } from "../types/weather";

interface Props {
  weather: WeatherData;
}

function WeatherCard({ weather }: Props) {
  return (
    <div className="card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather"
      />

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>{weather.weather[0].description}</p>

      <div className="details">
        <div className="detail-box">
          <WiHumidity size={45} />
          <span>{weather.main.humidity}%</span>
          <small>Humidity</small>
        </div>

        <div className="detail-box">
          <WiStrongWind size={45} />
          <span>{weather.wind.speed} km/h</span>
          <small>Wind Speed</small>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;