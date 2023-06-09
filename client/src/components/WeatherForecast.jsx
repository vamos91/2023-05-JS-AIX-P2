import React from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
    background-color: white;
    padding: 5px 10px;
    border-radius: 20px;
`;

const fetchWeather = async() => {
    const returnFetch = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=43.29&lon=5.36&appid="+process.env.REACT_APP_OPENWEATHERMAP_KEY
    );
    const fetchjson = await returnFetch.json();
    return fetchjson.records;
}

const WeatherForecast = () => {
    return (
        <WeatherContainer>
            METEO
        </WeatherContainer>
    );
};

export default WeatherForecast;