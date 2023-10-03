import React, { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamNzaWk5OCIsImEiOiJjbG1uNXJhMjUwbzJ4MnJwbmsyOXMzeHV5In0.-tU9mwYA1a7iN81veAtyYQ";

const AddressAutofill = ({ onSelected, onInputChange }) => {
  const searchRef = useRef();

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: "PH",
      // ... other options
    });

    const inputField = searchRef.current.querySelector("input");
    if (inputField) {
      inputField.addEventListener("input", onInputChange);
    }

    const handleResult = (ev) => {
      if (onSelected) {
        onSelected(ev.result);
      }
    };

    geocoder.on("result", handleResult);

    const previousGeocoder = searchRef.current.querySelector(
      ".mapboxgl-ctrl-geocoder"
    );
    if (previousGeocoder) {
      previousGeocoder.remove();
    }
    searchRef.current.appendChild(geocoder.onAdd());

    return () => {
      if (inputField) {
        inputField.removeEventListener("input", onInputChange);
      }
      geocoder.off("result", handleResult);
    };
  }, [onSelected, onInputChange]);

  return <div className="address-autofill-container" ref={searchRef} />;
};

export default AddressAutofill;
