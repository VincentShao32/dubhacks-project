"use client";

import OrderListingLink from "../components/OrderListingLink";
import { useEffect, useState } from "react";
import PlacesSearch from "../components/PlacesSearch";
import Popup from "../components/Popup";
import { getServerActionDispatcher } from "next/dist/client/components/app-router";

import { useAuth0 } from "@auth0/nextjs-auth0";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function page() {
  const [restaurant, setRestaurant] = useState("All Restaurants");
  const [distance, setDistance] = useState(1);
  const colors = [
    "bg-light-red",
    "bg-light-green",
    "bg-yellow",
    "bg-light-blue",
    "bg-light-purple",
    "bg-dark-pink",
  ];
  let i = -1;
  const [location, setLocation] = useState(null);

  let orders = useQuery(api.functions.listGroupOrders);
  const createOrder = useMutation(api.GroupOrderFunctions.createGroupOrder);
  const deleteOldOrders = useMutation(api.functions.deleteOldGroupOrders);

  useEffect(() => {
    function get_location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    get_location();
    
    console.log(Date.now());
    deleteOldOrders({current_time : Date.now()});

    if (orders && location && location.latitude && location.longitude) {
      sort_by_distance();
    }
  }, [orders]);

  function sort_by_distance() {
    const sortedOrders = orders.sort(
      (a, b) =>
        get_dist(
          a.pickup_lat,
          a.pickup_long,
          location.latitude ? location.latitude : 0,
          location.longitude ? location.longitude : 0
        ) -
        get_dist(
          b.pickup_lat,
          b.pickup_long,
          location.latitude ? location.latitude : 0,
          location.longitude ? location.longitude : 0
        )
    );
    orders = sortedOrders;
  }

  const get_dist = (lat, long, lat2, long2) => {
    return Math.sqrt(Math.pow(lat - lat2, 2) + Math.pow(long - long2, 2));
  };

  async function handleSubmit(e) {
    console.log("submitted");
    e.preventDefault();
    console.log("submitted");
  }

  const getRandomColor = () => {
    //const randomIndex = Math.floor(Math.random() * colors.length);
    //return colors[randomIndex];
    i++;
    if (i == 5) {
      i = 0;
    }
    return colors[i];
  };

  const getDistance = (lat, long, lat2, long2) => {
    return Math.sqrt(Math.pow(lat - lat2, 2) + Math.pow(long - long2));
  };

  return (
    <div className="flex flex-col max-w-[800px] w-full mx-auto mt-28 gap-6">
      <Popup />
      <h1 className="text-3xl font-[family-name:var(--font-satoshi-variable)] text-red">
        Upcoming Datch Groups*
      </h1>
      <h2 className="text-1xl font-[family-name:var(--font-satoshi-variable)] text-red">
        *Only showing groups ordering within 6 hours
      </h2>
      <form className="flex justify-between items-center gap-4">
        <div
          className="bg-gray-100  rounded-xl h-10 flex items-center p-6 gap-2"
          onSubmit={handleSubmit}
        >
          <label className="font-[family-name:var(--font-satoshi-variable)] text-xl text-red">
            From:
          </label>
          <select
            className="px-2 bg-white rounded h-8 text-black font-productsans"
            onChange={(e) => setRestaurant(e.target.value)}
          >
            <option value="All Restaurants">All Restaurants</option>
          </select>
        </div>
        <div className="bg-gray-100  rounded-xl h-10 flex items-center p-6 gap-2">
          <label className="font-[family-name:var(--font-satoshi-variable)] text-xl text-red">
            Find all orders in
          </label>
          <input
            className=" bg-white rounded text-black font-productsans w-[40px]"
            type="number"
            onChange={(e) => setDistance(e.target.value)}
            value={1}
          ></input>
          <p className="font-[family-name:var(--font-satoshi-variable)] text-xl text-red">
            mile radius
          </p>
        </div>
        <button className="bg-red text-white p-2 rounded-xl font-[family-name:var(--font-satoshi-variable)]">
          Submit
        </button>
      </form>
      {/* <OrderListingLink
        order={{
          restaurant: "Chipotle",
          pickup_location: "@ Madrona Hall",
          time: "9:20",
          author: "Yanda Bao",
          joined: "5",
          distance: "0.1 mi",
        }}
        color={getRandomColor()}
      /> */}
      {/* <OrderListingLink
        order={{
          restaurant: "Aladdin's",
          pickup_location: "@ Willow Hall",
          time: "10:00",
          author: "Vincent Shao",
          joined: "4",
          distance: "0.2 mi",
        }}
        color={getRandomColor()}
      />
      <OrderListingLink
        order={{
          restaurant: "BB's Teriyaki",
          pickup_location: "@ Oak Hall",
          time: "10:20",
          author: "Spencer Morga",
          joined: "2",
          distance: "0.3 mi",
        }}
        color={getRandomColor()}
      />
      <OrderListingLink
        order={{
          restaurant: "Panera Bread",
          pickup_location: "@ Lander Hall",
          time: "11:20",
          author: "Vanessa Ping",
          joined: "4",
          distance: "0.6 mi",
        }}
        color={getRandomColor()}
      />
      <OrderListingLink
        order={{
          restaurant: "Starbucks",
          pickup_location: "@ Alder Hall",
          time: "12:00",
          author: "Yanda Bao",
          joined: "2",
          distance: "0.7 mi",
        }}
        color={getRandomColor()}
      /> */}

      {orders &&
        orders.map((order) => (
          <OrderListingLink order={order} color={getRandomColor()} />
        ))}

      <Popup></Popup>
    </div>
  );
}

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
