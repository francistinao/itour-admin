import React, { useState, useEffect } from "react";
import Container from "@/components/container";
import { IoMdAdd } from "react-icons/io";
import AddEventModal from "@/components/add-event-modal";
import { Toaster } from "sonner";
import { useAdminStore, useEventStore } from "@/store/data";
import { handleGetEvents } from "@/api/event";
import EventCard from "@/components/event-card";

const Events: React.FC = () => {
	const { adminData } = useAdminStore();
	const { events, setEvents } = useEventStore();
	const [isAdd, setIsAdd] = useState(false);

	console.log(events);

	useEffect(() => {
		const fetchEvents = async () => {
			if (adminData?.office_id) {
				const response = await handleGetEvents(adminData.office_id);
				setEvents(response || []);
			}
		};

		fetchEvents();
	}, [adminData?.office_id]);

	return (
		<Container>
			<div className='flex flex-col gap-3 w-full'>
				<Toaster
					richColors
					position='bottom-right'
				/>
				<div className='flex justify-between items-center'>
					<h1>
						Manage your events. Feel free to create, delete, and update events for
						your participants to join.
					</h1>
					<button
						onClick={() => setIsAdd(!isAdd)}
						className='bg-secGreen text-white rounded-md flex gap-2 items-center px-3 py-2'>
						<IoMdAdd
							className='text-white'
							size={20}
						/>{" "}
						Add
					</button>
				</div>
				<div className='grid grid-cols-5 gap-x-4'>
					{Array.isArray(events) && events.length !== 0 ? (
						events.map((event, index) => (
							<EventCard
								key={index}
								//eslint-disable-next-line
								//@ts-ignore
								event={event}
								// onDelete={() => onDelete(event.id)}
								// onUpdate={() => onUpdate(event.id)}
							/>
						))
					) : (
						<p className='text-gray-500'>No events available.</p>
					)}
				</div>
				{isAdd && (
					<AddEventModal
						setIsAdd={setIsAdd}
						//eslint-disable-next-line
						//@ts-ignore
						handleGetEvents={handleGetEvents}
					/>
				)}
			</div>
		</Container>
	);
};

export default Events;
