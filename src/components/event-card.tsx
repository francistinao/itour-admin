import React from "react";
import {
	FaMapMarkerAlt,
	FaUsers,
	FaCalendarAlt,
	FaEdit,
	FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface EventCardProps {
	event: {
		thumbnail?: string;
		title: string;
		description: string;
		location: string;
		x_coordinate: number;
		y_coordinate: number;
		number_of_participants: number;
		created_at: string;
	};
	onDelete: () => void;
	onUpdate: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onUpdate }) => {
	return (
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
				<p className='text-gray-600 text-sm mb-4'>{event.description}</p>

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
				<button
					onClick={onUpdate}
					className='flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-150'>
					<FaEdit className='mr-2' />
					Update
				</button>

				<button
					onClick={onDelete}
					className='flex items-center text-red-500 hover:text-red-700 transition-colors duration-150'>
					<FaTrash className='mr-2' />
					Delete
				</button>
			</div>
		</motion.div>
	);
};

export default EventCard;
