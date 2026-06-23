import { useState } from "react";
import axios from "axios";
import type { WeatherData } from "./types/weather";
import WeatherCard from "./components/WeatherCard";
import { FaSearch, FaCloudSun } from "react-icons/fa";

export default function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getWeather = async (customCity?: string) => {
    const query = (customCity || city).trim();
    if (!query) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await axios.get<WeatherData>(
        `http://localhost:5000/weather/${query}`
      );

      setWeather(res.data);
    } catch {
      setError("City not found. Try again.");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-950  to-black flex items-center justify-center px-4">

      {/* Main Card */}
      <div className="w-full max-w-xl bg-black/25 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 text-white">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2">
            <FaCloudSun className="text-3xl" />
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          </div>
          <p className="text-sm opacity-80">
            Real-time weather updates anywhere
          </p>
        </div>

        {/* Search Box */}
        <div className="flex gap-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name..."
            className="flex-1 px-4 py-3 rounded-2xl text-black outline-none"
          />

          <button
            onClick={() => getWeather()}
            className="bg-black/40 hover:bg-black/60 px-5 rounded-2xl flex items-center gap-2 transition"
          >
            <FaSearch />
          </button>
        </div>

       

        {/* Loading */}
        {loading && (
          <div className="mt-6 space-y-3 animate-pulse">
            <div className="h-24 bg-white/20 rounded-2xl"></div>
            <div className="h-16 bg-white/20 rounded-xl"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-4 text-red-200 font-medium">
            {error}
          </p>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="mt-6">
            <WeatherCard data={weather} />
          </div>
        )}

      </div>
    </div>
  );
}