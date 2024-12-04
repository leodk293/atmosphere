"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import popularCities from "./search/cityList";

export default function Home() {
  const router = useRouter();

  const [errorHandler, setErrorHandler] = useState({
    error: false,
    loading: false,
  });
  const [cityData, setCityData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const cities = [
    "New York",
    "London",
    "Paris",
    "Washington DC",
    "Ottawa",
    "Buenos Aires",
    "Tokyo",
    "Chicago",
    "Los Angeles",
    "Berlin",
    "Shibuya",
    "Rome",
  ];

  async function fetchCityData(city) {
    setErrorHandler({ error: false, loading: true });
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER;
      if (!apiKey) throw new Error("API key is missing!");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const result = await response.json();
      return {
        temp: result.main.temp,
        skyState: result.weather[0]?.description || "Unknown",
      };
    } catch (error) {
      console.log(error.message);
      setErrorHandler({ error: true, loading: false });
      return null;
    }
  }

  useEffect(() => {
    async function fetchCityDataForAll() {
      const data = {};
      for (const city of cities) {
        const cityWeather = await fetchCityData(city);
        if (cityWeather !== null) data[city] = cityWeather;
      }
      setCityData(data);
      setErrorHandler({ error: false, loading: false });
    }
    fetchCityDataForAll();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?area=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <main className="flex flex-col">
      <div className="bg-sky flex items-center justify-center h-[15rem] w-full md:h-[20rem]">
        <h1 className="text-center font-bold text-3xl md:text-4xl">
          Welcome to Atmosphere
        </h1>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <form className="flex flex-row" onSubmit={handleSearch}>
          <input
            required
            className="py-1 px-3 capitalize text-2xl font-bold outline-none border-2 border-blue-950 rounded-tl-[5px] rounded-bl-[5px] bg-transparent"
            type="text"
            placeholder="Enter an area.."
            list="cities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search for a city"
          />
          <datalist id="cities">
            {popularCities.map((city) => (
              <option key={nanoid(10)} value={city} />
            ))}
          </datalist>
          <button
            type="submit"
            className="rounded-tr-[5px] rounded-br-[5px] text-3xl outline-none bg-blue-950 px-3"
          >
            🔍
          </button>
        </form>

        <div className="mt-10">
          {errorHandler.error ? (
            <p className="text-red-500">Something went wrong</p>
          ) : errorHandler.loading ? (
            <div className=" flex flex-col gap-4 items-center">
              <div className="loader" />
              <p className=" text-2xl">Loading...</p>
            </div>
          ) : (
            <>
              <div className=" mt-10 flex flex-col items-center gap-1">
                <h1 className="text-2xl text-slate-300 font-bold text-center md:text-3xl">
                  Temperature in popular cities
                </h1>
                <div className="hidden w-[55rem] rounded-[25px] h-[2px] bg-slate-300 md:block"></div>
              </div>
              <div className="flex flex-wrap mt-5 w-auto gap-5 justify-center md:w-[60rem]">
                {Object.keys(cityData).map((city) => (
                  <div
                    className="flex flex-col bg-[#1e1e732f] shadow-blue-900 border border-slate-400 p-3 w-[10rem] rounded-[5px] items-center gap-4 md:w-[13rem]"
                    key={nanoid(10)}
                  >
                    <p className="text-xl text-center text-blue-800 font-bold md:text-2xl">
                      {city}
                    </p>
                    <p className="font-semibold text-xl">
                      {cityData[city].temp}°C
                    </p>
                    <p className="text-sm italic font-semibold text-gray-300">
                      {cityData[city].skyState}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
