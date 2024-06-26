import React, { useEffect, useState, useRef } from "react";
import './Climate.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import rain_icon from '../assets/rain.png';

const Climate = () => {
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const [climateData, setClimateData] = useState({
    temperature: "",
    location: "",
    icon: clear_icon
  });

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name: ");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=78961b9e405e60db25f3c58627ab50b9`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setClimateData({
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weatherApp">
      <div className="input-section">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      <img src={climateData.icon} alt="" className="climate-icon" />
      <p className="temp">{climateData.temperature}&deg;C</p>
      <p className="place">{climateData.location}</p>
    </div>
  );
};

export default Climate;
