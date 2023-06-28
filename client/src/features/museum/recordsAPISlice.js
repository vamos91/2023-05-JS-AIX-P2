import {createSlice} from '@reduxjs/toolkit';

export const recordsAPISlice = createSlice({
    name: 'records',
    initialState: {
        museums: null,
        gardens: null,
        mixed: null
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
        mixeRecords: (state) => {
            state.mixed = [...state.museums, ...state.gardens];
        }
    }
});

export const {newMuseumsRecordsAPI, newGardensRecordsAPI, mixeRecords} = recordsAPISlice.actions

export default recordsAPISlice.reducer;