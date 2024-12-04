"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";

const Page = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("area");

  const [weatherData, setWeatherData] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  const [forecasts, setForecasts] = useState([]);

  const [showingMore, setShowingMore] = useState({
    message: "Show more",
    number: 8,
  });

  function handleShowingMore() {
    setShowingMore((prev) => ({
      message: prev.message === "Show more" ? "Show less" : "Show more",
      number: prev.message === "Show more" ? forecasts.length : 8,
    }));
  }

  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER;

  async function getAreaWeather() {
    setWeatherData((prev) => ({ ...prev, loading: true }));
    try {
      if (!apiKey) throw new Error("API key is missing!");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`An error has occured : ${response.status}`);
      }

      const result = await response.json();

      setWeatherData({
        error: false,
        data: result,
        loading: false,
      });
    } catch (error) {
      console.log(error.message);
      setWeatherData({
        error: true,
        data: undefined,
        loading: false,
      });
    }
  }

  async function getForecasts() {
    try {
      if (!apiKey) throw new Error("API key is missing!");

      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`An error has occured : ${response.status}`);
      }

      const result = await response.json();
      console.log(result.list.length);
      setForecasts(result.list);
    } catch (error) {
      console.log(error.message);
      setForecasts([]);
    }
  }

  useEffect(() => {
    if (searchQuery) {
      getAreaWeather();
      getForecasts();
    }
  }, [searchQuery]);

  return (
    <main className="mt-[100px]">
      {weatherData.error === true ? (
        <p className=" text-center text-2xl mt-5 font-bold h-[20rem] text-slate-300 md:text-4xl ">
          Sorry, your research does&apos;nt match
        </p>
      ) : weatherData.loading === true ? (
        <div className=" flex flex-col gap-4 items-center">
          <div className="loader" />
          <p className=" text-2xl">Loading...</p>
        </div>
      ) : (
        weatherData.data && (
          <div className=" flex flex-col w-auto m-auto md:w-[64rem]">
            <h1 className=" text-center font-extrabold text-4xl text-slate-300 md:text-5xl">
              {weatherData.data.name}
            </h1>
            <p className="mt-4 text-2xl text-center text-blue-700 font-semibold md:text-4xl">
              City from {weatherData.data.sys.country}
            </p>

            <h1 className=" mt-10 text-2xl font-bold text-center md:text-left md:text-3xl">
              Weather in {weatherData.data.name}
            </h1>
            <span className=" hidden h-[1px] w-[62rem] rounded-[25px] bg-white md:block" />

            <div className=" flex flex-wrap justify-center mt-5 gap-5 md:justify-start">
              <div className="flex flex-col font-semibold text-xl bg-[#1e1e732f] shadow-blue-900 border border-slate-400 px-5 py-2 rounded-[5px] gap-3 md:text-2xl">
                <p>Current temperature : {weatherData.data.main.temp}°C</p>
                <p>Max temperature : {weatherData.data.main.temp_max}°C</p>
                <p>Max temperature : {weatherData.data.main.temp_min}°C</p>
                <p>Feels like : {weatherData.data.main.feels_like}°C</p>
              </div>

              <div className="flex flex-col text-xl font-semibold bg-[#1e1e732f] shadow-blue-900 border border-slate-400 px-5 py-2 rounded-[5px] gap-3 md:text-2xl">
                <p>Humidity💧 : {weatherData.data.main.humidity}%</p>
                <p>Pressure : {weatherData.data.main.pressure}Pa</p>
                <p>
                  Sky&apos;state : {weatherData.data.weather[0].description}
                </p>
              </div>

              <div className="flex flex-col gap-4 items-center font-semibold text-xl bg-[#1e1e732f] shadow-blue-900 border border-slate-400 px-5 py-2 rounded-[5px]">
                <Image
                  src={`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`}
                  alt={""}
                  width={200}
                  height={200}
                  className=" bg-orange-500 rounded-[50%] invert object-cover"
                />
                <p className=" text-xl md:text-2xl">
                  {weatherData.data.weather[0].main}
                </p>
              </div>
            </div>

            <h1 className=" mt-10 text-2xl font-bold text-center md:text-left md:text-3xl">
              Forecosts for the next hours
            </h1>
            <span className=" hidden h-[1px] w-[62rem] rounded-[25px] bg-white md:block" />

            <div className=" mt-5 flex flex-wrap justify-center w-auto gap-4 md:w-[64rem] md:justify-start">
              {forecasts &&
                forecasts.slice(0, showingMore.number).map((forecast) => (
                  <div
                    className=" text-center w-[10rem] flex flex-col items-center bg-[#1e1e732f] shadow-blue-900 border border-slate-400 px-5 py-2 rounded-[5px] gap-4 md:w-[15rem]"
                    key={nanoid(10)}
                  >
                    <p className=" font-bold text-blue-100">
                      {forecast.dt_txt}
                    </p>
                    <p>Temp : {forecast.main.temp}°K</p>
                    <Image
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={""}
                      width={80}
                      height={50}
                      className=" bg-orange-500 rounded-[50%] invert object-cover"
                    />
                    <p className="italic">
                      Sky&apos;state : {forecast.weather[0].description}
                    </p>
                  </div>
                ))}
            </div>

            <button
              onClick={handleShowingMore}
              className=" mt-10 border border-transparent font-semibold text-xl py-2 self-center bg-blue-950 rounded-[5px] w-[160px] hover:bg-blue-800 hover:translate-x-4 duration-200"
            >
              {showingMore.message}
            </button>
          </div>
        )
      )}
    </main>
  );
};

export default Page;
