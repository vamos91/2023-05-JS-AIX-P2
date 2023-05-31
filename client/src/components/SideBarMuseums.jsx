import React from 'react';
import MuseumListCard from './MuseumListCard';

const SideBarMuseums = ({musee}) => {
    return (
        <MuseumListCard nomMusee = {musee.fields.autnom} addresse = {musee.fields.adrl1_m} codePostal = {musee.fields.cp_m} ville = {musee.fields.ville_m  } numeroTelphone = {musee.fields.tel_m} site = {musee.fields.url_m}/>
    );
};

export default SideBarMuseums;