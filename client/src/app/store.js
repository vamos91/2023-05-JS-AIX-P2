import {configureStore} from '@reduxjs/toolkit'
import recordsAPIReducer from '../features/museum/recordsAPISlice';

export default configureStore({
    reducer: {
        records: recordsAPIReducer
    }
});