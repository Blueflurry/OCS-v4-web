"use client";

import { useRef, useCallback } from "react";

/**
 * Custom hook for location suggestion caching
 * @param {number} maxSize - Maximum size of the cache (default: 50)
 * @param {number} expiryTime - Time in ms after which cached entries expire (default: 1 hour)
 * @returns {Object} - Cache interface with get, set, and filter methods
 */
export function useLocationCache(maxSize = 50, expiryTime = 3600000) {
    // Use ref to maintain cache between renders
    const cacheRef = useRef(new Map());

    // Get a value from cache if it exists and hasn't expired
    const get = useCallback(
        (key) => {
            const lowerKey = String(key).toLowerCase();
            if (!cacheRef.current.has(lowerKey)) return null;

            const { value, timestamp } = cacheRef.current.get(lowerKey);

            // Check if entry has expired
            if (expiryTime > 0 && Date.now() - timestamp > expiryTime) {
                cacheRef.current.delete(lowerKey);
                return null;
            }

            return value;
        },
        [expiryTime]
    );

    // Store a value in cache
    const set = useCallback(
        (key, value) => {
            const lowerKey = String(key).toLowerCase();

            // If cache is full, remove oldest entry
            if (cacheRef.current.size >= maxSize) {
                const oldestKey = cacheRef.current.keys().next().value;
                cacheRef.current.delete(oldestKey);
            }

            cacheRef.current.set(lowerKey, {
                value,
                timestamp: Date.now(),
            });
        },
        [maxSize]
    );

    // Clear the entire cache
    const clear = useCallback(() => {
        cacheRef.current.clear();
    }, []);

    // Filter locations with caching
    const filterLocations = useCallback(
        (query, locations) => {
            if (!query) return locations.slice(0, 10); // Return limited results for empty query

            const lowerQuery = query.toLowerCase();
            const cachedResults = get(lowerQuery);

            if (cachedResults) {
                // Console log is optional - you can remove in production
                console.log("Using cached results for:", lowerQuery);
                return cachedResults;
            }

            // Filter locations and cache results
            const results = locations.filter((location) =>
                location.value.toLowerCase().includes(lowerQuery)
            );

            set(lowerQuery, results);
            console.log("Caching new results for:", lowerQuery);
            return results;
        },
        [get, set]
    );

    // Get cache stats
    const getStats = useCallback(() => {
        return {
            size: cacheRef.current.size,
            maxSize,
            keys: Array.from(cacheRef.current.keys()),
        };
    }, [maxSize]);

    return {
        get,
        set,
        clear,
        filterLocations,
        getStats,
    };
}
