import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const marseilleLng = 5.36978;
  const marseilleLat = 43.296482;
  const mapContainer = useRef(null);
  const map = useRef(null);
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
      attributionControl: false,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      // For hide default markers of layer "poi-label" (transports excluded)
      map.current.setLayoutProperty("poi-label", "visibility", "none");
      // Add zoom and rotation controls to the map.
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });
    // Move map to users location if permission
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
  }, []);
  console.log(navigator);

  return (
    <MapWrapper ref={mapContainer} className="map-container"></MapWrapper>
  );
};
export default MapBox;
const MapWrapper = style.div`
 height: 100vh;
 `;
