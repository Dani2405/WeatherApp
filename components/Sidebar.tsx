import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import CityCard from "@/components/CityCard";
import {FiX} from "react-icons/fi";
import {FiPlus} from "react-icons/fi";
import {FiCheck} from "react-icons/fi";

interface SidebarProps {
  isVisible: boolean,
  hideSidebar: () => void,
  handleCityChange: (newCityName: string) => void,
  cities: string[],
}

const Sidebar: React.FC<SidebarProps> = (SidebarProps) => {
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [cityCards, setCityCards] = useState([]);

  const addCity = async () => {
    setIsAddingCity(false);
    if (!newCityName.trim()) return; // Prevent adding empty city names
    SidebarProps.handleCityChange(newCityName);
    setNewCityName("");

    populateCityCards();
  };

  const handleInputChange = (event: any) => {
    setNewCityName(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter')
      addCity();
  };

  const sidebarVariants = {
    visible: {
      x: 0,
      transition: {duration: 0.15, ease: "easeOut"},
    },
    hidden: {
      x: '-150%',
      transition: {duration: 0.15, ease: "easeIn"},
    },
  };

  async function populateCityCards() {
    let index = 0;
    const fetchedCityCards = [];

    for (const city of SidebarProps.cities) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e36427cc8407261650051f0098f071e&units=metric`);
        const weatherData = await response.json();

        var cityCard = {
          weatherData: weatherData
        };

        fetchedCityCards.push(cityCard);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    // @ts-ignore
    setCityCards(fetchedCityCards);
  }

  useEffect(() => {
    populateCityCards();
  }, [SidebarProps.cities]);

  return (
    <motion.div
      className={`sidebar fixed h-full flex-row`}
      variants={sidebarVariants}
      animate={SidebarProps.isVisible ? 'visible' : 'hidden'}>
      <div className="sidebar-header w-full flex">
        <button className="p-2" onClick={SidebarProps.hideSidebar}>
          <FiX className="w-12 h-12"/>
        </button>
        <h1 className="sidebarLogo content-center p-5">WeatherApp</h1>
      </div>
      <div className="sidebar-content flex flex-col items-center">
        {cityCards.map((cityData, index) => (
          <CityCard key={index} weatherData={cityData.weatherData} handleCityChange={SidebarProps.handleCityChange}/>
        ))}

        {isAddingCity ? (
          <div className="addCity h-16 w-full rounded-full flex p-4 content-center justify-center items-center">
            <input
              autoFocus
              className="w-full focus:outline-none rounded-full p-2"
              type="text"
              placeholder="Add city"
              value={newCityName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}/>
            <button onClick={addCity}>
              <FiCheck className="w-8 h-8"/>
            </button>
          </div>
        ) : (
          <div className="addCity h-16 w-16 rounded-full flex justify-center items-center p-4">
            <button onClick={() => setIsAddingCity(true)}>
              <FiPlus className="w-8 h-8"/>
            </button>
          </div>
        )}
      </div>
      <div className="sidebar-footer w-full content-center text-center">
        <p>Daniel Fischer<br/>&copy; 2024</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;