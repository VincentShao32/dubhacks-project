"use client";
import { useState } from "react";

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
    <APIProvider apiKey={"AIzaSyAYWtobG2oSNJ86vInjuF4gzVDHUKuerXg"}>
      <div style={{ height: "100vh", width: "100 %" }}>
        <Map zoom={9} center={position} mapId={"91e103c00ac4e104"}>
          <AdvancedMarker
            position={position}
            onClick={() => setOpen(true)}
          ></AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg! WOOHOO</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
