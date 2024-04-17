import React, {useEffect, useState} from 'react';
import type { CityProps } from "./cityProps";
import { getLocalTime, getLocalTimeHour, getOffsettedFormattedDate, getDayNames } from "./cityProps";
import {getGradient} from "@/components/gradientTransitions";

const City: React.FC<CityProps> = (CityProps) => {
  const [weatherForecast, setWeatherData] = useState(null);
  const [days, setDays] = useState([""]);
  let gradient = getGradient(CityProps.weatherData.weather[0].id, getLocalTimeHour(CityProps.weatherData.timezone));

  const fetchWeatherForecast = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CityProps.weatherData.name}&appid=7e36427cc8407261650051f0098f071e&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json()
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherForecast();
    // @ts-ignore
    setDays(getDayNames(CityProps.weatherData.timezone));
  }, [CityProps.setWeatherData, CityProps.handleCityChange]);

  return (
    <div className="city h-lvh" style={{backgroundColor: `${gradient[0]}`}}>
      <div className="cityContainer h-4/6" style={{backgroundImage: `linear-gradient(${gradient[0]}, ${gradient[1]})`}}>
        <h1 className="cityName">{CityProps.weatherData.name}</h1>
        <h2 className="cityTemp">{`${Math.round(CityProps.weatherData.main.temp)}°C`}</h2>
        <h2 className="capitalize w-full text-center h-12 text-2xl">{CityProps.weatherData.weather[0].description}</h2>
        <div className="cityTempDetails flex flex-row justify-center m-auto">
          <div>
            <h5>Feels like</h5>
            <h4>{`${Math.round(CityProps.weatherData.main.feels_like)}°C`}</h4>
          </div>
          <div>
            <h5>Max</h5>
            <h4>{`${Math.round(CityProps.weatherData.main.temp_max)}°C`}</h4>
          </div>
          <div>
            <h5>Min</h5>
            <h4>{`${Math.round(CityProps.weatherData.main.temp_min)}°C`}</h4>
          </div>
        </div>

        <img className="cityWeather" src={`./icons/${CityProps.weatherData.weather[0].icon}.svg`}/>
        <div className="cityTime">
          <h2>{getOffsettedFormattedDate(CityProps.weatherData.timezone)}</h2>
          <h3>{getLocalTime(CityProps.weatherData.timezone)}</h3>
        </div>
      </div>
      <div className="weatherDetails h-2/6 w-full flex" style={{backgroundColor: `${gradient[1]}`}}>
        <div className="weatherDetailsLeft h-full w-2/3 flex flex-wrap text-center" style={{backgroundImage: `linear-gradient(${gradient[0]}, ${gradient[1]})`}}>
          { weatherForecast ? (
            <>
              <div className="">
                <h2>{days[0]}</h2>
                <h3>{(weatherForecast as CityProps['weatherData']).list[0].weather[0].description}</h3>
                <img className="" src={`./icons/${(weatherForecast as CityProps['weatherData']).list[0].weather[0].icon}.svg`}/>
              </div>

              <div className="">
                <h2>{days[1]}</h2>
                <h3>{(weatherForecast as CityProps['weatherData']).list[8].weather[0].description}</h3>
                <img className="" src={`./icons/${(weatherForecast as CityProps['weatherData']).list[8].weather[0].icon}.svg`}/>
              </div>

              <div className="">
                <h2>{days[2]}</h2>
                <h3>{(weatherForecast as CityProps['weatherData']).list[16].weather[0].description}</h3>
                <img className="" src={`./icons/${(weatherForecast as CityProps['weatherData']).list[16].weather[0].icon}.svg`}/>
              </div>

              <div className="">
                <h2>{days[3]}</h2>
                <h3>{(weatherForecast as CityProps['weatherData']).list[24].weather[0].description}</h3>
                <img className="" src={`./icons/${(weatherForecast as CityProps['weatherData']).list[24].weather[0].icon}.svg`}/>
              </div>
            </>
          ) : (
            <div className="h-full w-full text-center content-center">Loading...</div>
          )}
        </div>

        <div className="weatherDetailsRight text-center flex flex-col justify-evenly w-1/3 text-3xl">
          <div className="h-1/3">
            <h5>Humidity</h5>
            <h4 className="text-3xl">{`${Math.round(CityProps.weatherData.main.humidity)}%`}</h4>
          </div>

          <div className="h-1/3">
            <h5>Pressure (hPa)</h5>
            <h4 className="">{`${Math.round(CityProps.weatherData.main.pressure)} `}</h4>
          </div>

          <div className="h-1/3">
            <h5>Wind</h5>
            <h4 className="text-2xl">{`${Math.round(CityProps.weatherData.wind.speed)} m/s`}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;