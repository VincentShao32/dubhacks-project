"use client";

import { useState, useEffect } from "react";
import PlacesSearch from "./PlacesSearch";
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
  const [orderByTime, setOrderByTime] = useState("");
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

  // Function to close the popup
  const closePopup = () => {
    setRestaurantName("");
    setUberLink("");
    setOrderByTime("");
    setIsOpen(false);
    setAddress('');
    setTriedButton(false);
  };

  const handleCreateOrder = async () => {
    if(user){
      console.log(user.email);
      console.log(user.name);
      console.log(placeName);
      const arr = [];
      arr.push(user.email);
      const group_id = await createPost({author: user.name, restaurant: restaurantName, pickup_address : address, pickup_lat: coordinates.lat, pickup_long: coordinates.lng, order_time: orderByTime, uber_link: uberLink, pickup_location: placeName});
      await addEmail({order_id : group_id, user_email : user.email});
    }
  };

  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYWtobG2oSNJ86vInjuF4gzVDHUKuerXg&libraries=places`}
        strategy="afterInteractive" // Load script after page becomes interactive
        onLoad={handleScriptLoad} // Set script loading to true after load
      />
      <button
        onClick={handleOpenGroupWindowCreate}
        className="fixed right-24 bottom-24 z-20 bg-red text-white font-[family-name:var(--font-satoshi-medium)] px-8 py-4 text-xl rounded-xl"
      >
        Create Group Order
      </button>
      <div className="select-none fixed z-10 right-[85px] bottom-[85px] border-[3px] border-red rounded-xl text-white px-8 py-4 text-xl">
        Create Group Order
      </div>
      {isOpen && (
        <div className="popup-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-1/2 h-3/4">
            <h1 className="">Start a Datch Order!</h1>
            <p>
              First, start a group order on Uber Eats grab the link you're
              given. Then, enter the restaurant, link, and when you want to
              close and place your group order! After creating the listing, you
              will be placed into a group chat with others in your Datch order,
              where you can communicate and remind them to finalize their
              orders.
            </p>
            <p>
              <input
                value={restaurantName}
                onChange={handleNameChange}
                placeholder="Restaurant... ex. Chipotle"
              ></input>
              <input
                value={uberLink}
                onChange={handleLinkChange}
                placeholder="Link to Uber Eats group order"
              ></input>
              <input
                value={orderByTime}
                onChange={handleTimeChange}
                className=""
                placeholder="Place order by... ex. 5:00 PM"
              ></input>
            </p>
            <div>
              {/* Conditionally render PlacesAutocomplete only after script is loaded */}
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
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input",
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
                                className,
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
              {/* <button onClick={handleCreateOrder} disabled={restaurantName == "" || orderByTime == "" || uberLink == ""}>Create Group Order</button> */}
              <button onClick={handleCreateOrder} disabled={!(address && restaurantName && orderByTime && uberLink && user)}>{!(address && restaurantName && orderByTime && uberLink && user) ? "Fill out all information!" : "Create Group Order"}</button>

              {/* Display coordinates once selected */}
              {/* {coordinates.lat && coordinates.lng && (
                <div>
                  Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                </div>
              )} */}
            </div>
            <button onClick={closePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
