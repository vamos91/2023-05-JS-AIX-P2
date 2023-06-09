import React, { useEffect } from "react";
import styled from "styled-components";
import RangeBar from "./RangeBar";
import WeatherForecast from "./WeatherForecast";

const fetchMusee = async (apiQuery) => {
  const returnFetch = await fetch(
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q="+apiQuery
  );
  const fetchjson = await returnFetch.json();
  return fetchjson.records;
};

const SearchBar = ({ musees, setMusees, perimeter, setPerimeter, center }) => {

  useEffect(() => {
    (async() => {
      const fetchjson = await fetchMusee('ville_m=Marseille');
      setMusees(fetchjson);
    })();
  }, []);

  useEffect(() => {
    (async() => {
      const fetchjson = await fetchMusee(`&geofilter.distance=${center.lat},${center.lng},${perimeter}`);
      setMusees(fetchjson);
    })();
  }, [perimeter]);

  return (
    <SearchBarWrapper>
      <RangeBar perimeter={perimeter} setPerimeter={setPerimeter} />
      <WeatherForecast />
    </SearchBarWrapper>
  );
};

export default SearchBar;
const SearchBarWrapper = styled.div`
  z-index: 1001;
  position: absolute;
  top: 10px;
  left: 60%;
  display: flex;
  /* background-color: white; */
`;
