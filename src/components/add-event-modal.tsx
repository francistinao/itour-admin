import React, { useState, Dispatch, SetStateAction } from "react";
import { toast, Toaster } from "sonner";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import supabase from "@/lib/supabase";
import { LeafletMouseEvent } from "leaflet";
import { useAdminStore } from "@/store/data";

interface AddEventModalProps {
	setIsAdd: Dispatch<SetStateAction<boolean>>;
	center?: [number, number];
	handleGetEvents: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
	setIsAdd,
	center = [8.956573, 125.596894],
	handleGetEvents,
}) => {
	const [selectedImageFile, setSelectedImageFile] = useState<string | null>(
		null
	);
	const { adminData } = useAdminStore();
	const [isGetCoordinates, setIsGetCoordinates] = useState(false);
	const [event, setEvent] = useState({
		thumbnail: "",
		title: "",
		description: "",
		location: "",
		x_coordinate: 0.0,
		y_coordinate: 0.0,
		number_of_participants: 0,
		office_id: 0,
		admin_id: "",
	});

	const handleFileInputChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			const base64 = (await toBase64File(file)) as string;
			setSelectedImageFile(base64);
			setEvent((prevItem) => ({ ...prevItem, thumbnail: base64 }));
		}
	};

	const toBase64File = (file: File) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	console.log("admin data", adminData);
	console.log("event data", event);

	const handleSaveEvent = async () => {
		try {
			if (
				event.thumbnail === "" ||
				event.title === "" ||
				event.description === "" ||
				event.number_of_participants === 0
			) {
				toast.error("Please input all the fields. Thank you!");
				return;
			}

			const { error } = await supabase.from("events").insert({
				thumbnail: event.thumbnail,
				title: event.title,
				description: event.description,
				location: event.location,
				x_coordinate: event.x_coordinate,
				y_coordinate: event.y_coordinate,
				number_of_participants: event.number_of_participants,
				office_id: adminData?.office_id,
				admin_id: adminData?.id,
			});

			if (error) {
				toast.error("Error adding new product in the inventory. Please try again.");
				return;
			}

			toast.success(`${event.title} has been successfully added!`);
			//eslint-disable-next-line
			//@ts-ignore
			handleGetEvents(adminData?.office_id);
			setIsAdd(false);
		} catch (err) {
			console.error("Error adding new item:", err);
			alert("Error adding new item.");
		}
	};

	const LocationMarker = () => {
		useMapEvents({
			click(e: LeafletMouseEvent) {
				if (isGetCoordinates) {
					setEvent((prev) => ({
						...prev,
						x_coordinate: e.latlng.lng,
						y_coordinate: e.latlng.lat,
					}));
					toast.success("Coordinates selected!");
				}
			},
		});

		return (
			<Marker position={[event.y_coordinate, event.x_coordinate]}>
				<Popup>Event Location</Popup>
			</Marker>
		);
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<Toaster
				position='top-center'
				richColors
			/>
			<div className='bg-white 0 p-6 rounded-lg shadow-lg w-full max-w-7xl max-h-full'>
				<h2 className='text-2xl text-black font-semibold mb-4'>Add Event</h2>
				<div className='grid grid-cols-2 gap-x-6'>
					{/* Form */}
					<div className='p-4 flex flex-col gap-3 max-h-[550px] overflow-y-auto'>
						<hr className='mb-4'></hr>
						<div className='flex items-center justify-center w-full'>
							{selectedImageFile ? (
								<div className='w-full h-64 flex items-center justify-center'>
									<img
										src={selectedImageFile}
										alt='Uploaded Thumbnail'
										className='max-h-full rounded-lg'
									/>
								</div>
							) : (
								<label
									htmlFor='dropzone-file'
									className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 '>
									<div className='flex flex-col items-center justify-center pt-5 pb-6'>
										<svg
											className='w-8 h-8 mb-4 text-zinc-800'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 20 16'>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
											/>
										</svg>
										<p className='mb-2 text-sm text-zinc-800'>
											<span className='font-semibold'>Click to upload</span> or drag and
											drop
										</p>
										<p className='text-xs text-zinc-800'>JPG or PNG (MAX. 800x400px)</p>
									</div>
									<input
										id='dropzone-file'
										type='file'
										className='hidden'
										onChange={handleFileInputChange}
									/>
								</label>
							)}
						</div>
						<div className='flex flex-col mt-3'></div>
						<div className='mb-4'>
							<label className='block mb-2 text-zinc-800 font-medium'>
								Event Title
							</label>
							<input
								type='text'
								onChange={(e) => {
									setEvent({
										...event,
										title: e.target.value,
									});
								}}
								className='border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
							/>
						</div>
						<div className='mb-4'>
							<label className='block mb-2 text-zinc-800 font-medium'>
								Description
							</label>
							<textarea
								placeholder='Enter Description'
								onChange={(e) => {
									setEvent({
										...event,
										description: e.target.value,
									});
								}}
								className='h-36 border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
							/>
						</div>
						<div className='mb-4'>
							<label className='block mb-2 text-zinc-800 font-medium'>Location</label>
							<input
								placeholder='Enter Location'
								type='text'
								onChange={(e) => {
									setEvent({
										...event,
										location: e.target.value,
									});
								}}
								className='border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
							/>
						</div>
						<div className='mb-4'>
							<div className='mb-4'>
								<button
									onClick={() => setIsGetCoordinates(!isGetCoordinates)}
									className={`px-4 py-2 ${
										isGetCoordinates ? "bg-red-600" : "bg-blue-600"
									} text-white rounded-md`}>
									{isGetCoordinates
										? "Stop Selecting Coordinates"
										: "Select Coordinates on Map"}
								</button>
							</div>
							<div className='flex justify-between items-center w-full'>
								<div className='flex flex-col gap-2'>
									<label className='block mb-2 text-zinc-800 font-medium'>
										X Coordiante
									</label>
									<input
										type='number'
										className='border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
										value={event?.x_coordinate ?? 0}
										readOnly
										aria-readonly
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label className='block mb-2 text-zinc-800 font-medium'>
										Y Coordinate
									</label>
									<input
										type='number'
										className='border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
										value={event?.y_coordinate ?? 0}
										readOnly
										aria-readonly
									/>
								</div>
							</div>
						</div>
						<div className='mb-4'>
							<label className='block mb-2 text-zinc-800 font-medium'>
								Number of Participants
							</label>
							<input
								type='number'
								onChange={(e) => {
									setEvent({
										...event,
										number_of_participants: parseInt(e.target.value),
									});
								}}
								className='border bg-gray-50 p-2 w-full text-zinc-800 rounded-md'
							/>
						</div>
						<div className='flex justify-end mt-4'>
							<button
								onClick={handleSaveEvent}
								className='px-4 py-2 bg-blue-600 text-white rounded-md'>
								Save Event
							</button>
							<button
								onClick={() => setIsAdd(false)}
								className='px-4 py-2  text-blue-600 rounded-md'>
								Close
							</button>
						</div>
					</div>
					{/* Map */}
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
						<LocationMarker />
					</MapContainer>
				</div>
			</div>
		</div>
	);
};

export default AddEventModal;
