import React, { useEffect } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {newMuseumsRecordsAPI, newGardensRecordsAPI, mixeRecords} from '../features/museum/recordsAPISlice';
import { setCenterRedux } from "../features/mapBox/mapBoxAPISlice";
import Filters from "./Filters";

const SearchBar = ({ setLoading, perimeter, setPerimeter, userLoc, setUserLoc }) => {
  const center = useSelector((state) => state.mapbox.center);
  const dispatch = useDispatch();
  const urlBasicMuseums =
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile";
  const urlBasicGardens =
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-jardins-remarquables";

  const fetchMusee = async (url, reducerDispatch) => {
    console.log('fetch')
    const returnFetch = await fetch(url);
    const fetchjson = await returnFetch.json();
    console.log("toto", fetchjson);
    dispatch(reducerDispatch(fetchjson));
  };

  useEffect(() => {
    const firstFetchMixed = async () => {
      await fetchMusee(
        urlBasicMuseums+`&geofilter.distance=${center.lat},${center.lng},${perimeter}`, 
        newMuseumsRecordsAPI);
      await fetchMusee(
        urlBasicGardens+`&geofilter.distance=${center.lat},${center.lng},${perimeter}`, 
        newGardensRecordsAPI);

      dispatch(mixeRecords(center));
    }

    setLoading(true);
    
    firstFetchMixed();

    setLoading(false);

  }, [perimeter, navigator.geolocation]);

  return (
    <SearchBarWrapper>
       <Filters perimeter={perimeter} setPerimeter={setPerimeter} />
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
`;