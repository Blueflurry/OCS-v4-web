"use client";
import React from "react";
import { MAPS_API_KEY } from "@/app/data/config";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "300px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: MAPS_API_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
            {/* <Marker position={center} /> */}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MyComponent);
