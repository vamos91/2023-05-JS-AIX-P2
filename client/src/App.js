import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";

function App() {
  const [loading, setLoading] = useState(true);
  const [musees, setMusees] = useState();
  const [perimeter, setPerimeter] = useState(10000);
  const [center, setCenter] = useState({ lng: 5.36978, lat: 43.296482 });

  console.log(musees);
  return (
    <div>
      <SearchBar
        musees={musees}
        setMusees={setMusees}
        perimeter={perimeter}
        setPerimeter={setPerimeter}
        center={center}
      />
      {musees && <SideBarMuseums musees={musees} />}
      {musees && (
        <MapBox
          museums={musees}
          perimeter={perimeter}
          setCenter={setCenter}
          center={center}
        />
      )}
    </div>
  );
}

export default App;
