"use client";

import OrderListingLink from "../components/OrderListingLink";
import { useEffect, useState } from "react";
import PlacesSearch from "../components/placesSearch";
import Popup from "../components/Popup";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function page() {
  const [location, setLocation] = useState({ latitude: 0, longtitude: 0 });
  const [restaurant, setRestaurant] = useState("All Restaurants");
  const [distance, setDistance] = useState(1);

  let orders = useQuery(api.functions.listGroupOrders);
  const createOrder = useMutation(api.GroupOrderFunctions.createGroupOrder);

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
    if (orders) {
      sort_by_distance();
    }
  }, [orders]);

  function sort_by_distance() {
    const sortedOrders = orders.sort(
      (a, b) =>
        get_dist(
          a.pickup_lat,
          a.pickup_long,
          location.latitude,
          location.longitude
        ) -
        get_dist(
          b.pickup_lat,
          b.pickup_long,
          location.latitude,
          location.longitude
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

  return (
    <div className="flex flex-col max-w-[800px] w-full mx-auto mt-28 gap-6">
      <Popup />
      <h1 className="text-3xl font-[family-name:var(--font-satoshi-variable)] text-red">
        Current Group Orders
      </h1>
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
      {orders && orders.map((order) => <OrderListingLink order={order} />)}
      {/* <OrderListing
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
      /> */}

      <PlacesSearch></PlacesSearch>
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
