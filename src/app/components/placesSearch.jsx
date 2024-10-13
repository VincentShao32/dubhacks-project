"use client";

import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Script from 'next/script';

const PlacesSearch = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

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

  return (
    <>
      {/* Google Maps API Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYWtobG2oSNJ86vInjuF4gzVDHUKuerXg&libraries=places`}
        strategy="afterInteractive"  // Load script after page becomes interactive
        onLoad={handleScriptLoad}  // Set script loading to true after load
      />
      
      <div>
        {/* Conditionally render PlacesAutocomplete only after script is loaded */}
        {isScriptLoaded ? (
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
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

        {/* Display coordinates once selected */}
        {coordinates.lat && coordinates.lng && (
          <div>
            Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
          </div>
        )}
      </div>
    </>
  );
};

export default PlacesSearch;