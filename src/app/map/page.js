"use client";
import { useState } from "react";
import PlacesSearch from "../components/placesSearch";
import Head from "next/head";
import Popup from "../components/Popup";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Intro() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popup />
      <APIProvider apiKey={"AIzaSyAYWtobG2oSNJ86vInjuF4gzVDHUKuerXg"}>
        <div style={{ height: "93vh", width: "100 %", marginTop: "7vh" }}>
          <Map zoom={9} center={position} mapId={"91e103c00ac4e104"}>
            <AdvancedMarker
              position={position}
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
