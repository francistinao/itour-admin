export interface Admin {
	id: number;
	name: string;
	designation: string;
	role: string;
	office_id: number;
	user_id: string;
}

export interface Events {
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

export interface Database {
	public: {
		Tables: {
			users: {
				id: number;
				first_name: string;
				last_name: string;
				designation: string;
			};
		};
	};
}
