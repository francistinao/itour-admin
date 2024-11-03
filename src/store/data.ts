import { create } from "zustand";
import supabase from "@/lib/supabase";
import Cookies from "js-cookie";

interface OfficeProps {
	id: number;
	office_name: string;
}

interface EventProps {
	id: number;
	title?: string;
	description?: string;
	location?: string;
	x_coordinate: number;
	y_coordinate: number;
	number_of_participants?: number;
	office_id: number;
	admin_id: string;
	created_at?: string;
}

interface AdminData {
	id: string;
	name: string;
	designation: string;
	role: string;
	office_id: number;
	user_id: string;
	created_at: string;
	office: Array<{ office_name: string }>;

	response: {
		data: {
			user: {
				id: string;
				aud: string;
				role: string;
				email: string;
				email_confirmed_at: string;
				phone: string;
				confirmed_at: string;
				last_sign_in_at: string;
				app_metadata: {
					provider: string;
					providers: string[];
				};
				user_metadata: {
					email: string;
					email_verified: boolean;
					phone_verified: boolean;
					sub: string;
				};
				identities: Array<{
					identity_id: string;
					id: string;
					user_id: string;
					identity_data: {
						email: string;
						email_verified: boolean;
						phone_verified: boolean;
						sub: string;
					};
					provider: string;
					last_sign_in_at: string;
					created_at: string;
					updated_at: string;
					email: string;
				}>;
				created_at: string;
				updated_at: string;
				is_anonymous: boolean;
			};
			session: {
				access_token: string;
				token_type: string;
				expires_in: number;
				expires_at: number;
				refresh_token: string;
				user: {
					id: string;
					aud: string;
					role: string;
					email: string;
					email_confirmed_at: string;
					phone: string;
					confirmed_at: string;
					last_sign_in_at: string;
					app_metadata: {
						provider: string;
						providers: string[];
					};
					user_metadata: {
						email: string;
						email_verified: boolean;
						phone_verified: boolean;
						sub: string;
					};
					identities: Array<{
						identity_id: string;
						id: string;
						user_id: string;
						identity_data: {
							email: string;
							email_verified: boolean;
							phone_verified: boolean;
							sub: string;
						};
						provider: string;
						last_sign_in_at: string;
						created_at: string;
						updated_at: string;
						email: string;
					}>;
					created_at: string;
					updated_at: string;
					is_anonymous: boolean;
				};
			};
		};
		error: null | string;
	};
}

interface AdminStore {
	hasLoaded: boolean;
	adminData: AdminData | null;
	loadAdminData: () => void;
	setAdminData: (data: AdminData | null) => void;
}

interface EventStore {
	events: Array<EventProps> | null;
	setEvents: (events: Array<EventProps> | null) => void;
}

interface HandleOfficeProps {
	offices: Array<OfficeProps> | null;
	setOffices: (offices: Array<OfficeProps> | null) => void;
	fetchOffices: () => Promise<void>;
}

export const useOfficeStore = create<HandleOfficeProps>((set) => ({
	offices: null,
	setOffices: (offices) => set({ offices }),
	fetchOffices: async () => {
		try {
			const { data, error } = await supabase
				.from("offices")
				.select("id, office_name");

			if (error) {
				throw new Error("Error getting all offices");
			}

			set({ offices: data });
		} catch (err) {
			console.error("Error getting offices", err);
		}
	},
}));

export const useEventStore = create<EventStore>((set) => ({
	events: null,
	setEvents: (events) => set({ events }),
}));

export const useAdminStore = create<AdminStore>((set) => ({
	adminData: null,
	hasLoaded: false,
	loadAdminData: () => {
		set((state) => {
			if (!state.hasLoaded) {
				const adminCookie = Cookies.get("adminData");
				if (adminCookie) {
					return {
						adminData: JSON.parse(adminCookie),
						hasLoaded: true,
					};
				}
				return { hasLoaded: true };
			}
			return state;
		});
	},
	setAdminData: (data: AdminData | null) => set({ adminData: data }),
}));
