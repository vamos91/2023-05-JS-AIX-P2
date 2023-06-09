import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
`;

const WeatherIcon = styled.img`
    max-height: 30px;
`;

const fetchWeather = async(signal) => {
    const returnFetch = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=43.29&lon=5.36&appid="+process.env.REACT_APP_OPENWEATHERMAP_KEY, 
    {signal});
    const fetchjson = await returnFetch.json();
    return fetchjson.weather[0];
}

const Weather = () => {
    const [weather, setWeather] = useState({main: "", icon:""});
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async() => {
            const fetchjson = await fetchWeather(signal);
            console.log(fetchjson)
            setWeather(fetchjson);
        })();
        
        return function cleanup() {
            controller.abort();
        }
    },[]);
    return (
        <WeatherContainer>
            <WeatherIcon src={`https://openweathermap.org/img/wn/${weather.icon}.png`}/>
            {`${weather.main} today`}
        </WeatherContainer>
    );
};

export default Weather;