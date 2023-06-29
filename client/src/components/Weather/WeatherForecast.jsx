import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BoxWeatherDay = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin: 0 5px;
    padding-right: 5px;
    &:hover{
        cursor: pointer;
    }
`;

const WeatherIcon = styled.img`
    max-height: 30px;
`;

const fetchWeather = async(signal, center) => {
    let weather5Days = [];
    const returnFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${center.lat}&lon=${center.lng}&appid=`+process.env.REACT_APP_OPENWEATHERMAP_KEY, 
    {signal});
    const fetchjson = await returnFetch.json();
    for(let i=0; i<5; i++){
        weather5Days.push(fetchjson.list[i*8]);
    }
    weather5Days.push(fetchjson.list[39]);
    return weather5Days;
}

const WeatherForecast = ({toggleWeather, setToggleWeather, center, weather5Days, setWeather5Days}) => {
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async() => {
            const fetchjson = await fetchWeather(signal, center);
            console.log('fetch meteo 5days',fetchjson)
            setWeather5Days(fetchjson);
        })();
        
        return function cleanup() {
            controller.abort();
        }
    },[]);

    const toogleWeatherBox = (index) => {
        const tmp = toggleWeather.days.map((day,i) => i == index ? {enable: !day.enable} : {enable: false});
        setToggleWeather(previous => ({...previous, days: tmp}));
    }
    return (
        <Container>
            {
                weather5Days && weather5Days.map((day, i) => (
                    <BoxWeatherDay 
                        key={'day'+i} 
                        onClick={() => toogleWeatherBox(i)}
                        style={toggleWeather.days[i].enable ? {backgroundColor: '#12B5CB', color: 'white'} : {}}
                    >
                        <WeatherIcon src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}/>
                        {`${day.weather[0].main} ${i==0 ? 'today' : 'd+'+i}`}
                    </BoxWeatherDay>
                ))
            }
        </Container>
    );
};

export default WeatherForecast;