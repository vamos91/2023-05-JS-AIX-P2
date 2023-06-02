import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ({ museums }) => {
  // console.log(museums);

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
    // create map data object
    const mapData = museums.map((record) => {
      return {
        type: "Feature",
        properties: {
          description: `<strong>${record.fields.nomoff}</strong><p>adresse</p>`,
          id: record.fields.ref,
          icon: "museum-pin",
        },
        geometry: {
          type: "Point",
          coordinates: [
            record.fields.geolocalisation_latlong[1],
            record.fields.geolocalisation_latlong[0],
          ], //[-77.038659, 38.931567],
        },
      };
    });
    console.log(mapData);
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        // "./locMusXS.svg",
        function (error, image) {
          if (error) throw error;
          map.current.addImage("museum-pin", image);

          // Add a GeoJSON source with multiple points
          map.current.addSource("places", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: mapData,
            },
          });

          // For hide default markers of layer "poi-label" (transports excluded)
          map.current.setLayoutProperty("poi-label", "visibility", "none");

          // Add a layer showing the places.
          map.current.addLayer({
            id: "places",
            type: "symbol",
            source: "places",
            //   paint: {
            //     "circle-color": "#12B5CB",
            //     "circle-radius": 8,
            //     "circle-stroke-width": 1,
            //     "circle-stroke-color": "#12B5CB",
            //   },
            layout: {
              "icon-image": ["get", "icon"],
              // "museum-marker-label":["get", "icon"],
              "icon-allow-overlap": true,
            },
          });
        } //
      ); //

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
  // console.log(navigator);

  return <MapWrapper ref={mapContainer} className="map-container"></MapWrapper>;
};
export default MapBox;
const MapWrapper = style.div`
 height: 100vh;
 `;
