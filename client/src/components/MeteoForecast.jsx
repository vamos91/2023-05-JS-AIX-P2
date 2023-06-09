import React from 'react';

const fetchWeather = async() => {
    const returnFetch = await fetch(
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q="+apiQuery
    );
    const fetchjson = await returnFetch.json();
    return fetchjson.records;
}

const MeteoForecast = () => {
    return (
        <div>
            
        </div>
    );
};

export default MeteoForecast;