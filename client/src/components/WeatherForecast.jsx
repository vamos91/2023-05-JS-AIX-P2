import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BoxWeatherDay = styled.div`
    background-color: white;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    margin: 0 5px;
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
                        {day.weather[0].main}
                    </BoxWeatherDay>
                ))
            }
            {/* <BoxWeatherDay>Day</BoxWeatherDay>
            <BoxWeatherDay>Day</BoxWeatherDay>
            <BoxWeatherDay>Day</BoxWeatherDay> */}
        </Container>
    );
};

export default WeatherForecast;