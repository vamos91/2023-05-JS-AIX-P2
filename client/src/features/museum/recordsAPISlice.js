import {createSlice} from '@reduxjs/toolkit';

export const recordsAPISlice = createSlice({
    name: 'records',
    initialState: {
        museums: null,
        gardens: null,
        mixed: null
    },
    reducers: {
        newMuseumsRecordsAPI : (state, action) => {
            state.museums = action.payload;
        }
    }
});

export const {newMuseumsRecordsAPI} = recordsAPISlice.actions

export default recordsAPISlice.reducer;