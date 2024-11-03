import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/data";
import Container from "@/components/container";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/card";
import { FaCalendarAlt, FaUsers, FaStar } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { handleGetCoordinatesOfEvents } from "@/api/event";

interface OverviewProps {
	center?: [number, number];
}

const Overview: React.FC<OverviewProps> = ({
	center = [8.956573, 125.596894],
}) => {
	const { adminData, loadAdminData } = useAdminStore();
	const [coordinates, setCoordinates] = useState<[number, number][]>([]);

	console.log(coordinates);
	useEffect(() => {
		loadAdminData();
	}, [loadAdminData]);

	useEffect(() => {
		const fetchCoordinates = async () => {
			if (adminData?.office_id) {
				const coords = await handleGetCoordinatesOfEvents(adminData.office_id);
				if (coords) {
					const formattedCoords: [number, number][] = coords.map(
						(coord) => [coord[1], coord[0]] as [number, number]
					);
					setCoordinates(formattedCoords);
				}
			}
		};

		fetchCoordinates();
	}, [adminData]);

	const eventData = [
		{
			id: 1,
			icon: FaCalendarAlt,
			label: "Number of Events",
			description: "Total number of upcoming events",
			value: 25,
			bgColor: "bg-blue-500",
		},
		{
			id: 2,
			icon: FaUsers,
			label: "Most Number of Attendees",
			description: "Highest attendance at an event",
			value: 150,
			bgColor: "bg-green-500",
		},
		{
			id: 3,
			icon: FaStar,
			label: "Most Attended Event",
			description: "Event with the highest number of attendees",
			value: 200,
			bgColor: "bg-yellow-500",
		},
	];

	return (
		<Container>
			<div className='flex flex-col gap-2'>
				<h1 className='font-bold text-2xl'>Events Details</h1>
				<h1>
					Office:{" "}
					<b className='bg-primGreen text-white font-semibold px-2 py-1 rounded-md'>
						{adminData?.office[0].office_name}
					</b>
				</h1>
				<div className='sm:flex sm:gap-3 md:grid grid-cols-3 gap-x-3 my-3'>
					{eventData.map((event) => (
						<Card
							key={event.id}
							icon={event.icon}
							label={event.label}
							description={event.description}
							value={event.value}
							bgColor={event.bgColor}
						/>
					))}
				</div>
			</div>
			<h1 className='font-semibold text-xl my-3'>
				Map of Caraga State University
			</h1>
			<MapContainer
				center={center}
				zoom={15}
				style={{ width: "100%", height: "500px" }}
				dragging={true}
				scrollWheelZoom={true}
				zoomAnimation={true}
				className='relative'>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{coordinates.map((coord, index) => (
					<Marker
						key={index}
						position={coord}>
						<Popup>
							Event {index + 1} <br /> Coordinates: {coord[0]}, {coord[1]}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</Container>
	);
};

export default Overview;
