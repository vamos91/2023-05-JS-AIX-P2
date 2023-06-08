import React, { useEffect } from "react";
import styled from "styled-components";

const SearchBar = ({ musees, setMusees, setLoading }) => {
  useEffect(() => {
    setLoading(true);
    const fetchMusee = async () => {
      const returnFetch = await fetch(
        "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ville_m=Marseille"
        //  "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=&rows=100&facet=dompal&facet=region"
      );
      const fetchjson = await returnFetch.json();
      setMusees(fetchjson.records);
      // console.log(fetchjson.records)
    };
    fetchMusee();
    // const timer = setTimeout(() => {
    setLoading(false);
    // }, 2000);
    // return () => clearTimeout(timer);
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
