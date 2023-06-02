import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from './components/SideBarMuseums'
import SearchBar from './components/SearchBar'

function App() {
  const [musees, setMusees] = useState()
  return (
    <div>
      {/* <MapBox /> */}
      <SearchBar musees={musees} setMusees={setMusees}/>
      {musees && <SideBarMuseums musees = {musees} />}
    </div>
  );
}

export default App;
