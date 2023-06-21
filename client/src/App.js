import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";
import {useSelector} from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  // const [musees, setMusees] = useState([]);
  // console.log(musees);

  const musees = useSelector(state => state.records.museums);

  return (
    <div>
      <SearchBar setLoading={setLoading}/>
      {musees && <SideBarMuseums isLoading={loading}/>}
      {musees && <MapBox museums={musees} />}
    </div>
  );
}

export default App;
