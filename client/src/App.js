import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";

function App() {
  const [musees, setMusees] = useState();
  console.log(musees);
  return (
    <div>
      <SearchBar musees={musees} setMusees={setMusees} />
      {musees && <SideBarMuseums musees={musees} />}
      {musees && <MapBox museums={musees} />}
    </div>
  );
}

export default App;
