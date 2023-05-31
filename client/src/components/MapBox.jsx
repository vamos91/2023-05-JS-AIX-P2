import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "styled-components";

const MapBox = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marseilleLng = 5.36978;
  const marseilleLat = 43.296482;
  const [lng, setLng] = useState(marseilleLng);
  const [lat, setLat] = useState(marseilleLat);
  const [zoom, setZoom] = useState(12);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/--noora--/cli2xoaez008c01qy7hmi3zb1",
      center: [lng, lat],
      zoom: zoom,
      keyboard: true,
      trackResize: true,
      scrollZoom: true,
      minZoom: 5,
      maxZoom: 19,
    });
  }, []);

  return <MapWrapper ref={mapContainer} className="map-container"></MapWrapper>;
};
export default MapBox;
const MapWrapper = style.div`
 height: 100vh;
 `;
