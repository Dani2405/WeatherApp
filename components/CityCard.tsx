import React from "react";
import type { CityProps } from "./cityProps";
import { getLocalTime, getLocalTimeHour } from "./cityProps";
import {getGradient} from "@/components/gradientTransitions";

const CityCard: React.FC<CityProps> = (CityProps) => {
  let gradient = getGradient(CityProps.weatherData.weather[0].id, getLocalTimeHour(CityProps.weatherData.timezone));

  return (
    <button className="cityCard" onClick={() => CityProps.handleCityChange(CityProps.weatherData.name)} style={{backgroundImage: `linear-gradient(${gradient[0]}, ${gradient[1]})`}}>
      <div className="cityCardContainer">
        <h1>{CityProps.weatherData.name}</h1>
        <div className="cityWeatherIcon" style={{ backgroundImage: `url(/icons/${CityProps.weatherData.weather[0].icon}.svg)`}}></div>
        <h3>{getLocalTime(CityProps.weatherData.timezone)}</h3>
        <h2>{`${Math.round(CityProps.weatherData.main.temp)}°C`}</h2>
      </div>
    </button>
  );
};

export default CityCard;