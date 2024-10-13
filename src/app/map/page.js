"use client";
import { useState, useEffect } from "react";
import PlacesSearch from "../components/PlacesSearch";
import Head from "next/head";
import Popup from "../components/Popup";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { jsonToConvex } from "convex/values";

export default function Intro() {
  // const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  // let json = JSON.stringify({ lat: 53.54, lng: 10 });
  const [lat, setLat] = useState(53.54);
  const [lng, setLng] = useState(10);
  // const [location, setLocation] = useState({lat:53.54, lng:10});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <Popup />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "93vh", width: "100 %", marginTop: "7vh" }}>
          <Map
            zoom={16}
            center={{ lat: lat, lng: lng }}
            mapId={"91e103c00ac4e104"}
          >
            <AdvancedMarker
              position={{ lat: lat, lng: lng }}
              onClick={() => setOpen(true)}
            ></AdvancedMarker>
            {open && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpen(false)}
              >
                <p>I'm in Hamburg! WOOHOO</p>
              </InfoWindow>
            )}
          </Map>
        </div>
        {/* <PlacesSearch></PlacesSearch> */}
      </APIProvider>
    </div>
  );
}
