import type { WeatherData } from "../types/weather";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";

type Props = {
  data: WeatherData;
};

export default function WeatherCard({ data }: Props) {
  return (
    <div className="mt-6 w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl">

      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm opacity-80 capitalize">
            {data.weather[0].description}
          </p>
        </div>

        <img
          className="w-20 h-20"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather icon"
        />
      </div>

      {/* Temperature */}
      <div className="mt-6 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">
          {Math.round(data.main.temp)}°
        </h1>
        <p className="text-sm opacity-80">Feels like {data.main.feels_like}°C</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">

        <div className="bg-white/10 rounded-2xl p-3">
          <WiHumidity className="mx-auto text-3xl" />
          <p className="text-sm mt-1">{data.main.humidity}%</p>
          <p className="text-xs opacity-70">Humidity</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-3">
          <WiStrongWind className="mx-auto text-3xl" />
          <p className="text-sm mt-1">{data.wind.speed}</p>
          <p className="text-xs opacity-70">Wind</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-3">
          <WiThermometer className="mx-auto text-3xl" />
          <p className="text-sm mt-1">{data.main.pressure}</p>
          <p className="text-xs opacity-70">Pressure</p>
        </div>

      </div>
    </div>
  );
}