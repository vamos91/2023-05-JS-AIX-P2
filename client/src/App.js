import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import SideBarMuseums from "./components/SideBarMuseums";
import SearchBar from "./components/SearchBar";
import { useSelector } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);
  const musees = useSelector((state) => state.records.mixed);
  const [perimeter, setPerimeter] = useState(10000);
  const [userLocalisation, setUserLocalisation] = useState(false);
  // console.log(musees);
  console.log(userLocalisation);
  console.log("musees app.js", musees);
  // Move map to users location if permission
  // if ("geolocation" in navigator) {
  //   setUserLocalisation(true);
  // } // TOO MANY RERENDERS
  useEffect(() => {
    console.log("App.js");
    console.log(musees);
    // console.log(userLocalisation);
    // console.log(center);
    // if ("geolocation" in navigator) {
    //     setUserLocalisation(true);
    //   }
  }, []);
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     setUserLocalisation(true);
  //   }
  // }, []);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log("position");
  //     console.log(position);
  //     // lng: position.coords.longitude,
  //     // lat: position.coords.latitude,
  //     setCenter({
  //       lng: position.coords.longitude,
  //       lat: position.coords.latitude,
  //     });
  //   });
  // }, [userLocalisation]);

  return (
    <div>
      <SearchBar
        setLoading={setLoading}
        perimeter={perimeter}
        setPerimeter={setPerimeter}
          userLoc={userLocalisation}
        setUserLoc={setUserLocalisation}
      />
      {musees && <SideBarMuseums isLoading={loading} />}
      {musees && (
        <MapBox perimeter={perimeter} loc={userLocalisation} />
      )}
    </div>
  );
}

export default App;
