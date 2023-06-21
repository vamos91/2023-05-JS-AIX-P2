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
`;

const WeatherIcon = styled.img`
    max-height: 30px;
`;

const fetchWeather = async(signal) => {
    let weather5Days = [];
    const returnFetch = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=43.29&lon=5.36&appid="+process.env.REACT_APP_OPENWEATHERMAP_KEY, 
    {signal});
    const fetchjson = await returnFetch.json();
    for(let i=0; i<5; i++){
        weather5Days.push(fetchjson.list[i*8]);
    }
    weather5Days.push(fetchjson.list[39]);
    return weather5Days;
}

const WeatherForecast = () => {
    const [weather5Days, setWeather5Days] = useState();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async() => {
            const fetchjson = await fetchWeather(signal);
            console.log(fetchjson)
            setWeather5Days(fetchjson);
        })();
        
        return function cleanup() {
            controller.abort();
        }
    },[]);
    return (
        <Container>
            {
                weather5Days && weather5Days.map((day, i) => (
                    <BoxWeatherDay key={'day'+i}>
                        <WeatherIcon src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}/>
                        {`${day.weather[0].main} ${i==0 ? 'today' : 'd+'+i}`}
                    </BoxWeatherDay>
                ))
            }
        </Container>
    );
};

export default WeatherForecast;