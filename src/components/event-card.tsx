import React, { useState } from "react";
import {
	FaMapMarkerAlt,
	FaUsers,
	FaCalendarAlt,
	FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PopupMap from "./popup-map";

interface EventCardProps {
	event: {
		id: number;
		thumbnail?: string;
		title: string;
		description: string;
		location: string;
		x_coordinate: number;
		y_coordinate: number;
		number_of_participants: number;
		created_at: string;
	};
	handleDeleteEventFoo: (event_id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
	event,
	handleDeleteEventFoo,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

	const handleMouseEnter = (e: React.MouseEvent) => {
		setIsHovered(true);
		updatePopupPosition(e);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		updatePopupPosition(e);
	};

	const updatePopupPosition = (e: React.MouseEvent) => {
		const xOffset = 10;
		const yOffset = 10;
		const x = e.clientX + xOffset;
		const y = e.clientY - yOffset;
		setPopupPosition({ x, y });
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='relative'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
				className='bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto border border-gray-200 transform transition-transform duration-200'>
				<img
					src={event.thumbnail}
					alt={event.title}
					className='w-full h-48 object-cover'
				/>
				<div className='p-5'>
					<h3 className='text-xl font-semibold text-gray-800 mb-2'>{event.title}</h3>
					<p className='text-gray-600 text-sm mb-4'>
						{event.description.length > 50
							? event.description.slice(0, 50) + "..."
							: event.description}
					</p>

					<div className='flex items-center text-gray-700 mb-2'>
						<FaMapMarkerAlt className='mr-2 text-blue-500' />
						<span className='text-xs'>{event.location}</span>
					</div>

					<div className='flex items-center text-gray-700 mb-2'>
						<FaUsers className='mr-2 text-green-500' />
						<span className='text-xs'>
							{event.number_of_participants} Participants
						</span>
					</div>

					<div className='flex items-center text-gray-700'>
						<FaCalendarAlt className='mr-2 text-red-500' />
						<span className='text-xs'>
							{new Date(event.created_at).toLocaleDateString()}
						</span>
					</div>
				</div>

				<div className='flex justify-between p-4 border-t bg-gray-50'>
					{/* <button
						onClick={onUpdate}
						className='flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-150'>
						<FaEdit className='mr-2' />
						Update
					</button> */}

					<button
						onClick={() => handleDeleteEventFoo(event.id)}
						className='flex items-center text-red-500 hover:text-red-700 transition-colors duration-150'>
						<FaTrash className='mr-2' />
						Delete
					</button>
				</div>
			</motion.div>
			{isHovered && (
				<div
					style={{
						position: "fixed",
						top: popupPosition.y,
						left: popupPosition.x,
						width: "220px",
						height: "220px",
						zIndex: 50,
					}}
					className='pointer-events-none'>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className='shadow-md rounded-lg overflow-hidden'>
						<PopupMap
							x_coordinate={event.x_coordinate}
							y_coordinate={event.y_coordinate}
						/>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default EventCard;
