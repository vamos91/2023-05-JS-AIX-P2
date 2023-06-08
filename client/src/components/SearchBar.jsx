import React, { useEffect } from "react";
import styled from "styled-components";
import RangeBar from "./RangeBar";

const SearchBar = ({ musees, setMusees, perimeter, setPerimeter }) => {
  useEffect(() => {
    const fetchMusee = async () => {
      const returnFetch = await fetch(
        "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ville_m=Marseille"
      );
      const fetchjson = await returnFetch.json();
      setMusees(fetchjson.records);
      // console.log(fetchjson.records)
    };

    fetchMusee();
  }, []);

  useEffect(() => {
    const fetchMusee = async () => {
      const returnFetch = await fetch(
        "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=&geofilter.distance=43.296679,5.362256,"+perimeter
      );
      const fetchjson = await returnFetch.json();
      setMusees(fetchjson.records);
      // console.log(fetchjson.records)
    };

    fetchMusee();
  }, [perimeter]);

  return (
    <SearchBarWrapper>
      SEARCHBAR
      <RangeBar perimeter={perimeter} setPerimeter={setPerimeter} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
const SearchBarWrapper = styled.div`
  z-index: 1001;
  position: absolute;
  top: 10px;
  left: 60%;
  background-color: white;
`;
