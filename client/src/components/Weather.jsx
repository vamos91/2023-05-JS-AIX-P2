import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
    background-color: white;
    padding: 5px 10px;
    border-radius: 20px;
`;

const fetchWeather = async(signal) => {
    const returnFetch = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=43.29&lon=5.36&appid="+process.env.REACT_APP_OPENWEATHERMAP_KEY, 
    {signal});
    const fetchjson = await returnFetch.json();
    return fetchjson.weather[0];
}

const Weather = () => {
    const [weather, setWeather] = useState();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async() => {
            const fetchjson = await fetchWeather(signal);
            console.log(fetchjson)
            setWeather(fetchjson.main);
        })();
        
        return function cleanup() {
            controller.abort();
        }
    },[]);
    return (
        <WeatherContainer>
            {weather}
        </WeatherContainer>
    );
};

export default Weather;