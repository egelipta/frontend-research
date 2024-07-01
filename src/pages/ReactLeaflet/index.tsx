import React, { memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PageContainer } from '@ant-design/pro-layout';
import L from 'leaflet';

// Fix for missing marker icons
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default memo(() => {
    const pos = [
        {
            lat: 5.54796391,
            long: 95.33033208,
            label: 'Banda Aceh'
        },
        {
            lat: 3.59247271,
            long: 98.66478780,
            label: 'Medan'
        },
        {
            lat: 0.50714034,
            long: 101.44551997,
            label: 'Pekanbaru'
        },
        {
            lat: -0.94690073,
            long: 100.35482945,
            label: 'Padang'
        },
        {
            lat: 0.91685591,
            long: 104.47868448,
            label: 'Tanjung Pinang'
        },
        {
            lat: -6.19589035,
            long: 106.81807779,
            label: 'Jakarta'
        },
    ]

    return (
        <PageContainer>
            <MapContainer
                center={[-0.86422453, 118.80318757]}
                zoom={5}
                style={{ width: '100%', height: '70vh' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {pos.map((posisi) =>
                    <Marker position={[posisi.lat, posisi.long]}>
                        {/* <Popup>
                            {posisi.label}
                        </Popup> */}
                        <Tooltip>{posisi.label}</Tooltip>
                    </Marker>
                )}

            </MapContainer>
        </PageContainer>
    );
});
