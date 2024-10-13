"use client"

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import OrderListing from "../components/OrderListing";
import { useEffect, useState } from "react";
import PlacesSearch from "../components/placesSearch";

export default function page () {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="flex flex-col max-w-[800px] w-full mx-auto mt-28 gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-[family-name:var(--font-satoshi-variable)] text-red">
          Current Group Orders
        </h1>
        <div className="bg-gray-300 max-w-[400px] w-full rounded-full h-12"></div>
      </div>
      <OrderListing
        order={{
          restaurant: "Restaurant # 1",
          pickup_location: "@ Madrona Hall",
          time: "7:20",
          author: "Yanda Bao",
          joined: "4",
          distance: "0.3 mi",
        }}
      />
      <OrderListing
        order={{
          restaurant: "Restaurant # 1",
          pickup_location: "@ Madrona Hall",
          time: "7:20",
          author: "Yanda Bao",
          joined: "4",
          distance: "0.3 mi",
        }}
      />
      <OrderListing
        order={{
          restaurant: "Restaurant # 1",
          pickup_location: "@ Madrona Hall",
          time: "7:20",
          author: "Yanda Bao",
          joined: "4",
          distance: "0.3 mi",
        }}
      />
      <OrderListing
        order={{
          restaurant: "Restaurant # 1",
          pickup_location: "@ Madrona Hall",
          time: "7:20",
          author: "Yanda Bao",
          joined: "4",
          distance: "0.3 mi",
        }}
      />
      <OrderListing
        order={{
          restaurant: "Restaurant # 1",
          pickup_location: "@ Madrona Hall",
          time: "7:20",
          author: "Yanda Bao",
          joined: "4",
          distance: "0.3 mi",
        }}
      />

      <PlacesSearch></PlacesSearch>
    </div>
  );
};


  // return (
  //   <div className="flex justify-center items-center h-screen">
  //     {location ? (
  //       <p>
  //         Latitude: {location.latitude}, Longitude: {location.longitude}
  //       </p>
  //     ) : (
  //       <p>Loading location...</p>
  //     )}
  //   </div>
  // );

// export default withPageAuthRequired(Page, {
//   onRedirecting: () => <Loading />,
//   onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });