import React, { useEffect } from "react";
import styled from "styled-components";
import RangeBar from "./RangeBar";

const fetchMusee = async (apiQuery) => {
  const returnFetch = await fetch(
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q="+apiQuery
  );
  const fetchjson = await returnFetch.json();
  return fetchjson.records;
};

const SearchBar = ({
  musees,
  setMusees,
  perimeter,
  setPerimeter,
  center,
  setCenter,
  userLoc,
  setUserLoc,
}) => {
  useEffect(() => {
    (async () => {
      const fetchjson = await fetchMusee("ville_m=Marseille");
      setMusees(fetchjson);
    })();
    if ("geolocation" in navigator) {
     
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position");
        console.log({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        } );
        setCenter({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
      setUserLoc(true);
    }
   
  }, []);

  useEffect(() => {
    console.log("center");
    console.log(center);
       if (userLoc) {
      // navigator.geolocation.getCurrentPosition((position) => {
      //   console.log("position");
      //   console.log({
      //     lng: position.coords.longitude,
      //     lat: position.coords.latitude,
      //   } );
      //   setCenter({
      //     lng: position.coords.longitude,
      //     lat: position.coords.latitude,
      //   });
      // });
    }
    (async () => {
      const fetchjson = await fetchMusee(
        `&geofilter.distance=${center.lat},${center.lng},${perimeter}`
      );
      setMusees(fetchjson);
    })();
  }, [perimeter, userLoc]);

  return (
    <SearchBarWrapper>
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
  /* background-color: white; */
`;
