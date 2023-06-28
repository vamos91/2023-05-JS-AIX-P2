import { createSlice } from "@reduxjs/toolkit";

export const mapBoxAPISlice = createSlice({
  name: 'mapbox',
  initialState: {
    center: { lng: 5.36978, lat: 43.296482 },
  },
  reducers: {
    setCenterRedux: (state, action) => {
        console.log(action.payload)
      state.center = action.payload;
    },
  },
});

export const {setCenterRedux} = mapBoxAPISlice.actions;

export default mapBoxAPISlice.reducer;
