import React, { useEffect } from "react";
import MuseumListCard from "./MuseumListCard";
import styled from "styled-components";
import Spinner  from "./Spinner";
import {useSelector} from 'react-redux';

const SideBar = styled.div`
  position: fixed;
  overflow-y: scroll;
  height: 100vh;
  z-index: 1000;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  width: 32rem;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgrey;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: grey;
  }

`;

const SideBarMuseums = ({ isLoading }) => {
  const filterMuseums = useSelector(state => state.records.filterMuseums);
  const filterGardens = useSelector(state => state.records.filterGardens);
  const mixed = useSelector(state => state.records.mixed);
  const museums = useSelector(state => state.records.museums);
  const gardens = useSelector(state => state.records.gardens);

  const elementsFilteredToMap = (elementsArray) => {
    return (elementsArray.map((element) => (
      <MuseumListCard
        key={element.recordid}
        nomMusee={element.fields.nomoff}
        addresse={element.fields.adrl1_m}
        codePostal={element.fields.cp_m}
        ville={element.fields.ville_m}
        numeroTelphone={element.fields.tel_m}
        site={element.fields.url_m}
      />
    )));
  }

  return (
    <SideBar>
      {isLoading && <Spinner />}
      {
        !isLoading && filterMuseums && filterGardens && elementsFilteredToMap(mixed)
      }
      {
        !isLoading && filterMuseums && !filterGardens && elementsFilteredToMap(museums)
      }
      {
        !isLoading && !filterMuseums && filterGardens && elementsFilteredToMap(gardens)
      }
    </SideBar>
  );
};

export default SideBarMuseums;