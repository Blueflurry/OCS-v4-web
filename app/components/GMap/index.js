"use client";
import React, { useState, useEffect, useCallback } from "react";
// import { MAPS_API_KEY } from "@/app/data/config";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
};

// Default center in case coordinates aren't provided
const defaultCenter = {
    lat: 28.6139, // Default to New Delhi, India
    lng: 77.209,
};

function GoogleMapComponent({ location }) {
    // Load the Google Maps JS API
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.MAPS_API_KEY,
    });

    // State for the map instance
    const [map, setMap] = useState(null);
    // State for the map center/coordinates
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    // Track if the component has mounted (for NextJS hydration)
    const [isMounted, setIsMounted] = useState(false);

    // Handle client-side mounting in Next.js
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update coordinates whenever location prop changes
    useEffect(() => {
        if (!location) return;

        // Handle the specific location structure:
        // { coordinates: { lat: 20.5937, lng: 78.9629 } }
        if (
            location.coordinates &&
            location.coordinates.lat !== undefined &&
            location.coordinates.lng !== undefined
        ) {
            setMapCenter({
                lat: parseFloat(location.coordinates.lat),
                lng: parseFloat(location.coordinates.lng),
            });
        }
    }, [location]);

    // Handle map load
    const onLoad = useCallback(
        function callback(map) {
            // Set appropriate zoom level for the location
            if (window.google) {
                const bounds = new window.google.maps.LatLngBounds();

                // Create a small area around the point to ensure proper zoom
                bounds.extend(
                    new window.google.maps.LatLng(
                        mapCenter.lat - 0.01,
                        mapCenter.lng - 0.01
                    )
                );
                bounds.extend(
                    new window.google.maps.LatLng(
                        mapCenter.lat + 0.01,
                        mapCenter.lng + 0.01
                    )
                );

                map.fitBounds(bounds);

                // Set a consistent zoom level after bounds calculation
                setTimeout(() => {
                    map.setZoom(15);
                }, 100);
            }

            setMap(map);
        },
        [mapCenter]
    );

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    // Handle loading and error states
    if (loadError) {
        return (
            <div
                style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                }}
            >
                Error loading maps
            </div>
        );
    }

    if (!isLoaded || !isMounted) {
        return (
            <div
                style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                }}
            >
                Loading map...
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                zoomControl: true,
            }}
        >
            {/* Add a marker at the specified location */}
            <Marker position={mapCenter} />
        </GoogleMap>
    );
}

// Set default props
GoogleMapComponent.defaultProps = {
    location: {
        coordinates: {
            lat: defaultCenter.lat,
            lng: defaultCenter.lng,
        },
        name: "Default Location",
    },
};

export default React.memo(GoogleMapComponent);
