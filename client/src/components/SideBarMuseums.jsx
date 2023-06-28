import React from "react";
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
  const musees = useSelector(state => state.records.mixed);

  return (
    <SideBar>
      {isLoading ? (
        <Spinner />
      ) : (
        musees.map((musee) => (
          <MuseumListCard
            key={musee.recordid}
            nomMusee={musee.fields.nomoff}
            addresse={musee.fields.adrl1_m}
            codePostal={musee.fields.cp_m}
            ville={musee.fields.ville_m}
            numeroTelphone={musee.fields.tel_m}
            site={musee.fields.url_m}
          />
        ))
      )}
    </SideBar>
  );
};

export default SideBarMuseums;
