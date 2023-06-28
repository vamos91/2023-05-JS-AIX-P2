import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";
import {useSelector} from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const musees = useSelector(state => state.records.mixed);
  const [perimeter, setPerimeter] = useState(10000);
  const [center, setCenter] = useState({lng: 5.36978,lat: 43.296482});

  console.log('app js',musees);
  return (
    <div>
      <SearchBar perimeter={perimeter} setPerimeter={setPerimeter} center={center} setLoading={setLoading} />
      {musees && <SideBarMuseums isLoading={loading}/>}
      {musees && <MapBox museums={musees} perimeter={perimeter} setCenter={setCenter} />}
    </div>
  );
}

export default App;
