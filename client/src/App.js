import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";

function App() {
  const [musees, setMusees] = useState();
  const [perimeter, setPerimeter] = useState(10000);

  console.log(musees);
  return (
    <div>
      <SearchBar musees={musees} setMusees={setMusees} perimeter={perimeter} setPerimeter={setPerimeter} />
      {musees && <SideBarMuseums musees={musees} />}
      {musees && <MapBox museums={musees} perimeter={perimeter} />}
    </div>
  );
}

export default App;
