import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOne from "../../assets/Doctor.svg"
import style from './Map.module.css';

const Map = ({ tours }) => {
    const mapRef = useRef(null); // Use a ref to hold the map instance

    useEffect(() => {
        if (!mapRef.current) {
            // Create a Leaflet map instance
            mapRef.current = L.map('map').setView([0, 0], 2); // Set initial view

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
        }

        // Clear existing markers
        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Add markers for each tour
        tours.forEach(tour => {
            const { latitude, longitude, img, title, _id } = tour;
            if (latitude && longitude) {
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `
                        <a href="/tourDetails/${_id}">
                            ${img ? `<img style="width:25px" src="http://localhost:5000/${img[0]}" alt="${title}" />` : ''}
                            <span class="marker-text">${title}</span>
                        </a>
                    `,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                });
        
                L.marker([latitude, longitude], { icon: customIcon }).addTo(mapRef.current);
            }
        });
        
        
        
        

        return () => {
            // Clean up the map instance when the component unmounts
            mapRef.current.remove();
            mapRef.current = null;
        };
    }, [tours]);

    return <div id="map" className={style.map}></div>;
};

export default Map;
