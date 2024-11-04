import supabase from "@/lib/supabase";
import { Events } from "@/types/global";

export const handleGetEvents = async (
	office_id: number
): Promise<Events[] | undefined> => {
	try {
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.eq("office_id", office_id);

		if (error) {
			throw new Error(
				"Error retrieving all events. Please check your internet connection and try again"
			);
		}

		return data;
	} catch (err) {
		console.error(err);
		throw new Error(
			"Error retrieving events. Please try again and check your internet connection."
		);
	}
};

export const handleGetCoordinatesOfEvents = async (
	office_id: number
): Promise<[number, number][]> => {
	try {
		const { data, error } = await supabase
			.from("events")
			.select("x_coordinate, y_coordinate")
			.eq("office_id", office_id);

		if (error) {
			throw new Error(
				"Error retrieving all events. Please check your internet connection and try again"
			);
		}

		return data.map((event) => [event.x_coordinate, event.y_coordinate]);
	} catch (err) {
		console.error(err);
		throw new Error(
			"Error retrieving events. Please try again and check your internet connection."
		);
	}
};

interface Details {
	number_of_events: number;
	total_participants: number;
	most_attended_event: number;
}

export const handleGetDetails = async (
	office_id: number | undefined
): Promise<Details> => {
	try {
		// number of events

		//total participants in all events

		// most number of attendees (get the event with most number_of_participants)
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.eq("office_id", office_id);

		if (error)
			throw new Error(
				"Unable to receive events. Please check your internet connection and try again."
			);

		const numberOfEvents = data.length;
		const totalParticipants = data.reduce(
			(acc, event) => acc + event.number_of_participants,
			0
		);
		const mostAttendeesEvent = data.sort(
			(a, b) => b.number_of_participants - a.number_of_participants
		)[0].number_of_participants;

		return {
			number_of_events: numberOfEvents,
			total_participants: totalParticipants,
			most_attended_event: mostAttendeesEvent,
		};
	} catch (err) {
		console.error(err);
		throw new Error(
			"Error retrieving details of events. Please try again and check your internet connection."
		);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDeleteEvent = async (event_id: number): Promise<any> => {
	try {
		const { data, error } = await supabase
			.from("events")
			.delete()
			.eq("id", event_id);

		if (error)
			throw new Error(
				"Unable to delete event. Please check your internet connection and try again."
			);

		return data;
	} catch (err) {
		console.error(err);
		throw new Error(
			"Error deleting the event. Please try again and check your internet connection."
		);
	}
};
