"use client"

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import ClientComponent from "./ClientComponent";
import { useEffect, useState } from "react";

export default function Page() {
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
    <div className="flex justify-center items-center h-screen">
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

// export default withPageAuthRequired(Page, {
//   onRedirecting: () => <Loading />,
//   onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });