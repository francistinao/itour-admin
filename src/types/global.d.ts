export interface Admin {
 id: number;
 name: string;
 designation: string;
 role: string;
 office_id: number;
 user_id: string;
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
