import React, { useEffect, useState } from "react";
import MapBox from "./components/MapBox/MapBox";
import MuseumApiManager from "./MuseumApiManager";

function App() {
  // const [museums, setMuseums] = useState([]);
  // useEffect(() => {
  //   setMuseums(MuseumApiManager.fetchMuseums());
  //   console.log(museums);
  // }, []);
  const [loading, setLoading] = useState(true);
  const [museums, setMuseums] = useState([]);
  useEffect(() => {
    // async () => {
    // const returnFetch = await fetch(url);
    // if(returnFetch.status === 200){
    //   const museumsJson = await returnFetch.json();
    console.log(MuseumApiManager.fetchMuseums());
    const getMuseums = MuseumApiManager.fetchMuseums();
    setMuseums(getMuseums);
    console.log(museums);
    // console.log( getFilteredMuseums());
    setLoading(false);
  }, []);
  console.log(museums);
  return !loading && (
    <div>
      <MapBox museums={museums} />
    </div>
  );
}

export default App;
