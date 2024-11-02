import React from "react";
import Container from "@/components/container";
import { MapContainer, TileLayer } from "react-leaflet";
import { Card } from "@/components/card";
import { FaCalendarAlt, FaUsers, FaStar } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

interface OverviewProps {
	center?: [number, number];
}

const Overview: React.FC<OverviewProps> = ({
	center = [8.956573, 125.596894],
}) => {
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
				//eslint-disable-next-line
				//@ts-ignore
				center={center}
				zoom={15}
				zoomSnap={0.5}
				maxZoom={23}
				style={{ width: "100%", height: "500px" }}
				dragging={true}
				scrollWheelZoom={true}
				zoomAnimation={true}
				zoomAnimationThreshold={4}
				className='relative'>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					//eslint-disable-next-line
					//@ts-ignore
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
			</MapContainer>
		</Container>
	);
};

export default Overview;
