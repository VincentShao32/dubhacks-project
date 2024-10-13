"use client";

import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useAuth0 } from '@auth0/nextjs-auth0';

// import { BaseAuthAPI } from "auth0/dist/cjs/auth/base-auth-api";

const Popup = () => {
  // const { getAccessTokenSilently } = useAuth0();

  let a = 5;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenGroupWindowCreate = () => {
    setIsOpen(true);
  };

  const createPost = useMutation(api.functions.createGroupOrder);
  const addEmail = useMutation(api.functions.addUserToGroupOrder);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [placeName, setPlaceName] = useState("");

  const [restaurantName, setRestaurantName] = useState("");
  const [orderByTime, setOrderByTime] = useState(Date.now());
  const [uberLink, setUberLink] = useState("");

  const [email, setEmail] = useState("");
  const { user, error, isLoading } = useUser();
  const handleNameChange = (event) => {
    setRestaurantName(event.target.value);
  };

  const handleTimeChange = (event) => {
    setOrderByTime(event.target.value);
  };

  const handleLinkChange = (event) => {
    setUberLink(event.target.value);
  };

  const handleChange = (address) => {
    setAddress(address);
  };
  const handleSelect = async (address) => {
    setAddress(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  };

  // Script loading state management
  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (user) {
      console.log(user.email);
      console.log(user.name);
      console.log(placeName);
      const arr = [];
      arr.push(user.email);
      const timeInMsSinceEpoch = new Date(orderByTime).getTime();
      const group_id = await createPost({
        author: user.name,
        restaurant: restaurantName,
        pickup_address: address,
        pickup_lat: coordinates.lat,
        pickup_long: coordinates.lng,
        order_time: timeInMsSinceEpoch,
        uber_link: uberLink,
        pickup_location: placeName,
      });
      await addEmail({ order_id: group_id, user_email: user.email });
    }
    closePopup();
  }

  // Function to close the popup
  const closePopup = () => {
    setRestaurantName("");
    setUberLink("");
    setOrderByTime("");
    setIsOpen(false);
    setAddress("");
  };

  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
        strategy="afterInteractive" // Load script after page becomes interactive
        onLoad={handleScriptLoad} // Set script loading to true after load TODO: resolve this not loading on first time entering page
        loading="async"
      />
      <button
        onClick={handleOpenGroupWindowCreate}
        className="fixed right-24 bottom-24 z-20 bg-red text-white font-[family-name:var(--font-satoshi-medium)] px-8 py-4 text-xl rounded-xl"
      >
        Create Group Order
      </button>
      <div className="select-none fixed z-10 bg-white right-[85px] bottom-[85px] border-[3px] border-red rounded-xl text-white px-8 py-4 text-xl">
        Create Group Order
      </div>
      {isOpen && (
        <div className="popup-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  rounded-xl shadow-lg max-w-[450px] w-full flex flex-col ">
            <div className="rounded-t-xl text-white font-[family-name:var(--font-satoshi-variable)] bg-red p-6">
              <h1 className="text-4xl pl-2">New BiteShare </h1>
            </div>
            <form
              className="flex flex-col gap-4 px-8 pb-8 pt-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className="text-red font-[family-name:var(--font-satoshi-variable)] text-lg">
                  Restaurant Name
                </label>
                <input
                  value={restaurantName}
                  onChange={handleNameChange}
                  placeholder="Enter name"
                  className="bg-gray-100 rounded-t-xl p-2 border-b-2 border-b-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-red font-[family-name:var(--font-satoshi-variable)] text-lg">
                  Group Order Link
                </label>
                <input
                  value={uberLink}
                  onChange={handleLinkChange}
                  placeholder="Enter link"
                  className="bg-gray-100 rounded-t-xl p-2 border-b-2 border-b-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-red font-[family-name:var(--font-satoshi-variable)] text-lg">
                  Order Time
                </label>
                <input
                  type="datetime-local"
                  value={orderByTime}
                  onChange={handleTimeChange}
                  placeholder="Enter time"
                  className="bg-gray-100 rounded-t-xl p-2 border-b-2 border-b-black"
                ></input>
              </div>
              {isScriptLoaded ? (
                <PlacesAutocomplete
                  value={address}
                  onChange={handleChange}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <label className="text-red font-[family-name:var(--font-satoshi-variable)] text-lg">
                        Pickup Location
                      </label>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className:
                            "location-search-input rounded-t-xl bg-gray-100 w-full p-2 border-b-black border-b-2",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          setPlaceName(suggestion.description);
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className: "",
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              ) : (
                <p>Loading Google Maps...</p>
              )}
              <button
                disabled={
                  !(
                    address &&
                    restaurantName &&
                    orderByTime &&
                    uberLink &&
                    user
                  ) || new Date(orderByTime).getTime() < Date.now()
                }
                className="w-full font-[family-name:var(--font-satoshi-variable)] bg-red p-2 text-white rounded-xl mt-4"
              >
                {!(address && restaurantName && orderByTime && uberLink && user)
                  ? "Fill out all information!"
                  : new Date(orderByTime).getTime() < Date.now()
                    ? "Enter a valid time"
                    : "Create Group Order"}
                {/* <button onClick={handleCreateOrder} disabled={!(address && restaurantName && orderByTime && uberLink && user) || (new Date(orderByTime).getTime() < Date.now())}>{!(address && restaurantName && orderByTime && uberLink && user) ? "Fill out all information!" : (new Date(orderByTime).getTime() < Date.now()) ? "Enter a valid time" : "Create Group Order"}</button> */}
              </button>
              <button
                onClick={closePopup}
                className='"w-full font-[family-name:var(--font-satoshi-variable)] bg-red p-2 text-white rounded-xl mt-4"'
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
