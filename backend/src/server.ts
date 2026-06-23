import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY as string;

type WeatherResponse = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
};

app.get("/", (req, res) => {
  res.send("🌦️ Weather API is running successfully!");
});

app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const { data } = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch weather",
      error: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});