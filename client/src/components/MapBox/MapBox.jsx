import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "styled-components";
import "./mapBox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import PopUp from "./PopUp";

const MapBox = ({ museums, perimeter, setCenter, center, loc }) => {
  // console.log(museums);
  console.log(perimeter);
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapInit, setMapInit] = useState(false);
  const [zoom, setZoom] = useState(12);
  const [lngLat, setLngLat] = useState();
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const mapData = museums.map((record) => {
    return {
      type: "Feature",
      properties: {
        image: "https://picsum.photos/300/200",
        name:
          record.fields.nomoff.charAt(0).toUpperCase() +
          record.fields.nomoff.slice(1),
        place: record.fields.lieu_m ?? "",
        address: record.fields.adrl1_m ?? "",
        cp: record.fields.cp_m ?? "",
        city: record.fields.ville_m ?? "",
        id: record.fields.ref,
        icon: "museum-pin",
      },
      geometry: {
        type: "Point",
        coordinates: [
          record.fields.geolocalisation_latlong[1],
          record.fields.geolocalisation_latlong[0],
        ],
      },
    };
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/--noora--/cli2xoaez008c01qy7hmi3zb1",
      center: [center.lng, center.lat],
      zoom: zoom,
      keyboard: true,
      trackResize: true,
      scrollZoom: true,
      minZoom: 5,
      maxZoom: 19,
      attributionControl: false,
    });

    map.current.on("move", () => {
      setCenter(map.current.getCenter());
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.loadImage(
        // "https://i.postimg.cc/QC9j8Xpk/loc-Gard-XS.png", // GARDENS
        // "./locMusXS.png",
        "https://i.postimg.cc/QC2hVRmL/locMusXS.png",
        function (error, image) {
          if (error) throw error;
          if (!map.current.hasImage("museum-pin"))
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
            layout: {
              "icon-image": ["get", "icon"],
              // "museum-marker-label":["get", "icon"],
              "icon-allow-overlap": true,
            },
          });
        }
      );

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        className: "map-popup",
        maxWidth: "200px",
      });

      map.current.on("click", "places", async (e) => {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // add personalised PopUp
        if (e.features.length > 0) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div"); // refaire un composant
          createRoot(popupNode).render(<PopUp records={feature.properties} />);
          popUpRef.current
            .setLngLat(coordinates)
            .setDOMContent(popupNode)
            .addTo(map.current);
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        // await resolveAfter2Seconds(coordinates, description, map.current);
        // console.log(popup.getElement());
      });

      // function resolveAfter2Seconds(coordinates, description, map) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(
      //         popup.setLngLat(coordinates).setHTML(description).addTo(map.current)
      //       );
      //     }, 2000);
      //   });
      // }

      // Add zoom and rotation controls to the map.
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });
    // Move map to users location if permission
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     map.current.flyTo({
    //       center: [position.coords.longitude, position.coords.latitude],
    //       essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    //     });
    //     setCenter({
    //       lng: position.coords.longitude,
    //       lat: position.coords.latitude,
    //     });
    //   });
    // }
    setMapInit(true);
  }, []);

  useEffect(() => {
    console.log("MapBox UE2 [perimetre] center");
    console.log(center);
    console.log("MapBox UE2 [perimetre] museums");
    console.log(museums);
    console.log("MapBox UE2 [perimetre] perimeter");
    console.log(perimeter);

    if (mapInit) {
      // Calcul le zoom par rapport au périmètre et au centre
      const mapSize = map.current.getCanvas();
      const maxPixels =
        mapSize.width > mapSize.height ? mapSize.height / 2 : mapSize.width / 2;
      const metersPerPixel = perimeter / maxPixels;
      const zoom =
        (Math.log(40075016.686 * Math.cos((7.25 * Math.PI) / 180)) -
          Math.log(metersPerPixel)) /
          Math.LN2 -
        8;
      map.current.flyTo({
        center: [center.lng, center.lat],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
      map.current.setZoom(zoom);
      setCenter(map.current.getCenter());

      // if(loc){
      // map.current.flyTo({
      //   center: [center.lng, center.lat],
      //   essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      // });
      // setCenter(map.current.getCenter());
      // }
      // setCenter({
      //   lng: position.coords.longitude,
      //   lat: position.coords.latitude,
      // });

      if (map.current.getSource("places")) {
        map.current.getSource("places").setData({
          type: "FeatureCollection",
          features: mapData,
        });
      }
    }
  }, [museums]);

  return <MapWrapper ref={mapContainer} className="map-container"></MapWrapper>;
};
export default MapBox;
const MapWrapper = style.div`
 height: 100vh;
 `;
