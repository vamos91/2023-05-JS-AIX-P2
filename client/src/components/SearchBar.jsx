import React, { useEffect } from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import {newMuseumsRecordsAPI, newGardensRecordsAPI, mixeRecords} from '../features/museum/recordsAPISlice';

const SearchBar = ({ setLoading }) => {
  const dispatch = useDispatch();

  const fetchMusee = async (url, reducerDispatch) => {
    const returnFetch = await fetch(url);
    const fetchjson = await returnFetch.json();
    dispatch(reducerDispatch(fetchjson));
  };

  useEffect(() => {
    setLoading(true);

    const firstFetchMixed = async () => {
      await fetchMusee(
        "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ville_m=Marseille", 
        newMuseumsRecordsAPI);
      await fetchMusee(
        "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-jardins-remarquables&q=commune=Marseille", 
        newGardensRecordsAPI);

      dispatch(mixeRecords());
    }
    
    firstFetchMixed();

    setLoading(false);
  }, []);

  return <SearchBarWrapper>SEARCHBAR</SearchBarWrapper>;
};

export default SearchBar;
const SearchBarWrapper = styled.div`
  z-index: 1001;
  position: absolute;
  top: 10px;
  left: 60%;
  background-color: white;
`;
