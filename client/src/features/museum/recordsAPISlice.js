import {createSlice} from '@reduxjs/toolkit';
import distance from '@turf/distance';

export const recordsAPISlice = createSlice({
    name: 'records',
    initialState: {
        museums: null,
        gardens: null,
        mixed: null,
        filterMuseums: true,
        filterGardens: true
    },
    reducers: {
        newMuseumsRecordsAPI: (state, action) => {
            state.museums = action.payload.records;
        },
        newGardensRecordsAPI: (state, action) => {
            state.gardens = [];
            action.payload.records.forEach(record => {
                state.gardens.push({
                recordid: record.recordid,
                fields:{
                    geolocalisation_latlong: record.fields.coordonnees_geographiques,
                    latitude: record.fields.latitude,
                    longitude: record.fields.longitude,
                    ville_m: record.fields.commune,
                    nomoff: record.fields.nom_du_jardin,
                    adrl1_m: record.fields.numero_et_libelle_de_la_voie,
                    atout: record.fields.description,
                    interet: record.fields.equipement_precision,
                    region: record.fields.region,
                    url_m: record.fields.site_internet_et_autres_liens.slice(2,record.fields.site_internet_et_autres_liens.length-2).replace(/http(s?):\/\/(w*)(\.*)/,''),
                    cp_m: record.fields.code_postal,
                    dpt: record.fields.departement,
                    tel_m: 'aucun',
                    themes: record.fields.types
                },
                geometry: record.geometry
            })});
        },
        mixeRecords: (state, action) => {
            state.mixed = [];
            let indexGarden = 0;
            let indexMuseum = 0;
            while(indexMuseum < state.museums.length && indexGarden < state.gardens.length){
                const distanceCenterToMuseum = distance([action.payload.lng, action.payload.lat],state.museums[indexMuseum].geometry.coordinates);
                const distanceCenterToGarden = distance([action.payload.lng, action.payload.lat],state.gardens[indexGarden].geometry.coordinates);
                if(distanceCenterToGarden < distanceCenterToMuseum){
                    state.mixed.push(state.gardens[indexGarden]);
                    indexGarden++;
                }else{
                    state.mixed.push(state.museums[indexMuseum]);
                    indexMuseum++;
                }
            };
            while(indexMuseum < state.museums.length){
                state.mixed.push(state.museums[indexMuseum]);
                indexMuseum++;
            } 
            while(indexGarden < state.gardens.length){
                state.mixed.push(state.gardens[indexGarden]);
                indexGarden++;
            }
            console.log('mixed',state.mixed)
            // state.mixed = [...state.museums, ...state.gardens];
        },
        setFilterMuseums: (state, action) => {
            state.filterMuseums = action.payload.filterMuseums;
        },
        setFilterGardens: (state, action) => {
            state.filterGardens = action.payload.filterGardens;
        }
    }
});

export const {newMuseumsRecordsAPI, newGardensRecordsAPI, mixeRecords, setFilterMuseums, setFilterGardens} = recordsAPISlice.actions

export default recordsAPISlice.reducer;