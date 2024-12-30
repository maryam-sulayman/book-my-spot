import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '300px',
};

const center = {
    lat: 40.7128,
    lng: -74.0060, 
};

export default function MapView({ markers }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: '',
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
            {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
        </GoogleMap>
    );
}
