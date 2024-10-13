"use client";
import { useState, useEffect } from "react";
import Popup from "../components/Popup";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

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
  const [open, setOpen] = useState([]);

  const orders = useQuery(api.functions.listGroupOrders);

  useEffect(() => {
    const arr = [];
    console.log("Created open");
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        arr.push(false);
      }
    }
    setOpen(arr);
  }, [orders]);

  function handleClick(bool, index) {
    console.log(open.length);
    console.log(index);
    const arr = Array.from(open);
    arr[index] = bool;
    setOpen(arr);
  }

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
            zoom={15}
            center={{ lat: lat, lng: lng }}
            mapId={"91e103c00ac4e104"}
          >
            {orders &&
              orders.map((item, index) => (
                <>
                  <AdvancedMarker
                    position={{ lat: item.pickup_lat, lng: item.pickup_long }}
                    onClick={() => handleClick(true, index)}
                  ></AdvancedMarker>
                  {open[index] && (
                    <InfoWindow
                      position={{ lat: item.pickup_lat, lng: item.pickup_long }}
                      onCloseClick={() => handleClick(false, index)}
                    >
                      <p>{item.restaurant}</p>
                      <p>{"Pickup at: " + item.pickup_location}</p>
                      <p>
                        {"Order before: " +
                          new Date(item.order_time)
                            .getHours()
                            .toString()
                            .padStart(2, "0") +
                          ":" +
                          new Date(item.order_time)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0") +
                          (new Date(item.order_time).getHours() < 12
                            ? " AM"
                            : " PM")}
                      </p>
                    </InfoWindow>
                  )}
                </>
              ))}
          </Map>
        </div>
        {/* <PlacesSearch></PlacesSearch> */}
      </APIProvider>
    </div>
  );
}
