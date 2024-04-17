"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import City from "@/components/City";
import {FiMenu} from "react-icons/fi";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showSidebar = () => {
    setIsVisible(true);
  };

  const hideSidebar = () => {
    setIsVisible(false);
  };

  const fetchWeatherData = async () => {
    if (cityName === "" || cityName === undefined) return;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7e36427cc8407261650051f0098f071e&units=metric`);
    if (!response.ok)
      throw new Error('Failed to fetch weather data, might not exist in database');
    else {
      const data = await response.json()
      setWeatherData(data);
      saveCity(data);
    }
  };

  function saveCity(data: any) {
    if (localStorage.getItem('cities') === null)
      return localStorage.setItem('cities', JSON.stringify([data.name]));

    let storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (!storedCities.includes(data.name))
      storedCities.push(data.name);
    setCities(storedCities);
    localStorage.setItem('cities', JSON.stringify(storedCities));
  }

  const handleCityChange = (newCityName: string) => {
    setCityName(newCityName);
    hideSidebar();
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  useEffect(() => {
    setCities(JSON.parse(localStorage.getItem('cities') || '[]'));
    setCityName(JSON.parse(localStorage.getItem('cities') || '[]')[0]);
  }, []);

  return (
    <>
      <Sidebar isVisible={isVisible} hideSidebar={hideSidebar} handleCityChange={handleCityChange} cities={cities} />

      <button className="showSideBar p-2" onClick={showSidebar}>
        <FiMenu className="w-12 h-12"/>
      </button>

      {weatherData ? (
       <City weatherData={weatherData} setWeatherData={setWeatherData} handleCityChange={handleCityChange}/>
      ) : (
        <div className="fixed w-full h-full flex justify-center content-center items-center flex-col">
          <h1 className="font-bold">No data</h1>
          <h2>Add a city in the menu</h2>
        </div>
      )}
    </>
  );
};

export default Home;
