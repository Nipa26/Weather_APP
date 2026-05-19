import { useState } from "react";
import axios from "axios";
import type { WeatherData } from "./types/weather";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await axios.get<WeatherData>(
        `http://localhost:5000/weather/${city}`
      );

      setWeather(res.data);
    } catch (err) {
      setError("⚠️ City not found or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-400 to-indigo-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          🌦️ Weather App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-2 rounded-xl text-black outline-none"
          />

          <button
            onClick={getWeather}
            className="bg-black/40 hover:bg-black/60 px-4 py-2 rounded-xl transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 animate-pulse">
            Loading weather...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-4 text-red-200 font-medium">
            {error}
          </p>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <WeatherCard weather={weather} />
        )}

      </div>
    </div>
  );
}