import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  newMuseumsRecordsAPI,
  newGardensRecordsAPI,
  mixeRecords,
} from "../features/museum/recordsAPISlice";
import { setCenterRedux } from "../features/mapBox/mapBoxAPISlice";
import RangeBar from "./RangeBar";
import Weather from "./Weather/Weather";
import WeatherForecast from "./Weather/WeatherForecast";

const SearchBar = ({
  setLoading,
  perimeter,
  setPerimeter,
  userLoc,
  setUserLoc,
}) => {
  const [toggleWeather, setToggleWeather] = useState({
    enable: false,
    days: [
      { enable: false },
      { enable: false },
      { enable: false },
      { enable: false },
      { enable: false },
      { enable: false },
    ],
  });
  const dispatch = useDispatch();
  const center = useSelector((state) => state.mapbox.center);
  const urlBasicMuseums =
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile";
  const urlBasicGardens =
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-jardins-remarquables";

  const fetchMusee = async (url, reducerDispatch) => {
    const returnFetch = await fetch(url);
    const fetchjson = await returnFetch.json();
    console.log("toto", fetchjson);
    dispatch(reducerDispatch(fetchjson));
  };

  useEffect(() => {

    // setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position");
        console.log({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        // setCenter({
        //   lng: position.coords.longitude,
        //   lat: position.coords.latitude,
        // });
       dispatch(setCenterRedux({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      }));
        setUserLoc(true);
      });
    }
    const firstFetchMixed = async () => {
      await fetchMusee(
        urlBasicMuseums + "&q=ville_m=Marseille",
        newMuseumsRecordsAPI
      );
      await fetchMusee(
        urlBasicGardens + "&q=commune=Marseille",
        newGardensRecordsAPI
      );

      dispatch(mixeRecords());
    };

    firstFetchMixed();

    setLoading(false);
  }, []);

  useEffect(() => {
    const perimeterFetchMixed = async () => {
      await fetchMusee(
        urlBasicMuseums +
          `&geofilter.distance=${center.lat},${center.lng},${perimeter}`,
        newMuseumsRecordsAPI
      );
      await fetchMusee(
        urlBasicGardens +
          `&geofilter.distance=${center.lat},${center.lng},${perimeter}`,
        newGardensRecordsAPI
      );
      dispatch(mixeRecords());
    };
    perimeterFetchMixed();

    // (async() => {
    //   await fetchMusee(urlBasicMuseums+`&geofilter.distance=${center.lat},${center.lng},${perimeter}`, newMuseumsRecordsAPI);

    // })();
  }, [perimeter, userLoc]);
  return (
    <SearchBarWrapper>
      <FiltersWrapper>
        <RangeBar perimeter={perimeter} setPerimeter={setPerimeter} />
        <Weather
          toggleWeather={toggleWeather}
          setToggleWeather={setToggleWeather}
          center={center}
        />
      </FiltersWrapper>
      <div
        style={
          toggleWeather.enable ? { display: "block" } : { display: "none" }
        }
      >
        <WeatherForecast
          toggleWeather={toggleWeather}
          setToggleWeather={setToggleWeather}
          center={center}
        />
      </div>
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
  flex-direction: column;
  /* background-color: white; */
`;
const FiltersWrapper = styled.div`
  display: flex;
  margin: 10px 0;
`;
