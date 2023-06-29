import {configureStore} from '@reduxjs/toolkit'
import recordsAPIReducer from '../features/museum/recordsAPISlice';
import mapBoxAPIReducer from '../features/mapBox/mapBoxAPISlice';

export default configureStore({
    reducer: {
        records: recordsAPIReducer,
        mapbox: mapBoxAPIReducer
    }
});