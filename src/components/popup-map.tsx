import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface PopupMapProps {
	x_coordinate: number;
	y_coordinate: number;
}

const PopupMap: React.FC<PopupMapProps> = ({ x_coordinate, y_coordinate }) => {
	return (
		<MapContainer
			center={[y_coordinate, x_coordinate]}
			zoom={18}
			style={{ width: "220px", height: "220px", borderRadius: "8px" }}
			scrollWheelZoom={false}
			dragging={false}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[y_coordinate, x_coordinate]} />
		</MapContainer>
	);
};

export default PopupMap;
