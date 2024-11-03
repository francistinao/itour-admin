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
