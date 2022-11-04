import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
const Weather = () => {
  const [weatherDetails, setweatherDetails] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [search, setSearch] = useState("butwal");

  const getWeatherDetails = (location) => {
    if (location == "" || location == []) return null;
    let how_to_search =
      typeof location === "string"
        ? `?q=${location}`
        : `?lat=${location[0]}&lon=${location[1]}`;

    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather${how_to_search}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        )
        .then((response) => {
          setweatherDetails({
            name: response.data?.name,
            cod: response.data?.cod,
            coordinates: response.data?.coord,
            temperature: response.data?.main,
            countryDetailsWithSunSetAndSunRise: response.data?.sys,
            date: response.data?.dt,
            weather: response.data?.weather[0],
            windSpeed: response.data?.wind?.speed,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherDetails(search);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const kelvinToCelsius = (K) => {
    let celsius = Math.trunc(K - 273.15);
    return celsius;
  };

  console.log(weatherDetails);
  return (
    <div className="min-h-screen flex flex-col gap-8 items-center  justify-center">
      <div className="form-control">
        <button
          className=" mb-2 btn"
          onClick={() => getWeatherDetails([latitude, longitude])}
        >
          <img src="/location.svg" />
          Get Your Own
        </button>
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-square"
            onClick={() => getWeatherDetails(search)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="">
        {weatherDetails != null && (
          <div className="flex flex-col  rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl">{weatherDetails.name}</div>
            <div className="text-sm ">
              {moment(weatherDetails.timezone).format("MMMM Do YYYY, h:mm a")}
            </div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg  h-24 w-24">
              <img
                src={`http://openweathermap.org/img/wn/${weatherDetails.weather.icon}@2x.png`}
              />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">
                {kelvinToCelsius(weatherDetails.temperature.temp)}°C
              </div>
              <div className="flex flex-col items-center ml-6">
                <div>{weatherDetails.weather.main}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up"></i>
                  </span>
                  <span className="text-sm font-light">
                    {kelvinToCelsius(weatherDetails.temperature.temp_max)}°C
                  </span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down"></i>
                  </span>
                  <span className="text-sm font-light">
                    {" "}
                    {kelvinToCelsius(weatherDetails.temperature.temp_min)}°C
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm ">{weatherDetails.windSpeed} km/h</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm ">
                  {weatherDetails.temperature.humidity}%
                </div>
              </div>
              <div className="flex flex-col items-center ml-2">
                <div className="font-medium text-sm">Feels Like</div>
                <div className="text-sm ">
                  {kelvinToCelsius(weatherDetails.temperature.feels_like)}°C
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
