import React, { useState, useEffect } from "react";
import Container from "@/components/container";
import { IoMdAdd } from "react-icons/io";
import AddEventModal from "@/components/add-event-modal";
import { toast, Toaster } from "sonner";
import { useAdminStore, useEventStore } from "@/store/data";
import { handleGetEvents, handleDeleteEvent } from "@/api/event";
import EventCard from "@/components/event-card";

const Events: React.FC = () => {
	const { adminData } = useAdminStore();
	const { events, setEvents } = useEventStore();
	const [isAdd, setIsAdd] = useState(false);

	const handleDeleteEventFoo = (event_id: number) => {
		try {
			toast.warning("Do you want to delete? Ignore if not", {
				action: {
					label: "Confirm",
					onClick: async () => {
						await handleDeleteEvent(event_id);
						toast.success("Event successfully deleted.");
					},
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const fetchEvents = async () => {
			if (adminData?.office_id) {
				const response = await handleGetEvents(adminData.office_id);
				setEvents(response || []);
			}
		};

		fetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [adminData?.office_id, isAdd, handleDeleteEventFoo]);

	return (
		<Container>
			<div className='flex flex-col gap-3 w-full'>
				<Toaster
					richColors
					position='top-center'
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
				<div className='grid grid-cols-5 gap-4'>
					{Array.isArray(events) && events.length !== 0 ? (
						events.map((event, index) => (
							<EventCard
								key={index}
								//eslint-disable-next-line
								//@ts-ignore
								event={event}
								handleDeleteEventFoo={handleDeleteEventFoo}
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
