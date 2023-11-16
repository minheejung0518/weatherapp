import React from "react";
import { useEffect,useState } from 'react';
import WeatherBox from "./WeatherBox";
import WeatherButton from "./WeatherButton";
import { ThreeDots } from "react-loader-spinner";

export default function Weather () {
    const [weather, setWeather] = useState(null);
    const cities = ["Paris", "New York", "London", "Busan"]; 
    const [city, setCity] = useState("");
    const [visible, setVisible] = useState(false);

    const getCurrentLocation=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          console.log("현재 위치", lat, lon)
          getWeatherByCurrentLocation(lat , lon);
        })
      }

     //api 가져오기
    const getWeatherByCurrentLocation= async (lat, lon)=>{
     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`
     setVisible(true);
     let response = await fetch(url)
     let data = await response.json();
     console.log(data);
     setWeather(data);
     setVisible(false);
    }  

    useEffect(() => {
        getCurrentLocation()
      },[])

    const getWeatherByCity = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4907ce44200e88bb23cf4b0cde72688&units=metric`;
        setVisible(true);
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data);
        setVisible(false);
    }; 
    
    useEffect(() => {
        if(city == '') {
          getCurrentLocation();
        }
        else {
            getWeatherByCity();
        }
    }, [city])
     

 return (
    <>
    {visible ? (
        <div className="container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={visible}
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} />
        </div>
      )}
   </>
 )
    
}