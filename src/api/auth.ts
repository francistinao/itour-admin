import Cookies from "js-cookie";
import supabase from "@/lib/supabase";
import { Admin } from "@/types/global";
import { useAdminStore } from "@/store/data";
import { NavigateFunction } from "react-router-dom";

export const handleSignUp = async ({ ...input }) => {
	try {
		const response = await supabase.auth.signUp({
			email: input.email,
			password: input.password,
		});

		const uid = response?.data?.user?.id;

		let idOfNewlyCreatedOffice;

		if (
			typeof input.office_input_ref === "string" &&
			input.office_input_ref !== ""
		) {
			const { data, error } = await supabase
				.from("offices")
				.insert({
					office_name: input.office_input_ref,
				})
				.select("*");

			if (error) throw new Error("Error creating office.");
			console.log(data);
			idOfNewlyCreatedOffice = data;
		}

		console.log(idOfNewlyCreatedOffice);
		const { data: adminData, error: adminError } = await supabase
			.from("admins")
			.insert({
				name: input.name,
				designation: input.designation,
				office_id: input.office_id ?? idOfNewlyCreatedOffice![0].id,
				user_id: uid,
			})
			.select("*");

		if (adminError) throw new Error("Error adding new admin");

		return adminData as Array<Admin>;
	} catch (err) {
		console.error(err);
	}
};

export const handleLogin = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const response = await supabase.auth.signInWithPassword({ email, password });
		const uid = response?.data?.user?.id;

		if (!uid) throw new Error("Invalid credentials");

		const { data, error } = await supabase
			.from("admins")
			.select("*")
			.eq("user_id", uid);
		if (error) throw new Error("Error getting admin information");

		const { data: office, error: officeErr } = await supabase
			.from("offices")
			.select("office_name")
			.eq("id", data[0].office_id);
		if (officeErr) throw new Error("Error getting office name");

		const responseData = { response, ...data[0], office };

		Cookies.set("adminData", JSON.stringify(responseData), {
			expires: 1,
			secure: true,
			sameSite: "Strict",
		});

		return responseData;
	} catch (err) {
		console.log("Login error:", err);
	}
};

export const handleLogout = async (navigate: NavigateFunction) => {
	const { setAdminData } = useAdminStore.getState();

	try {
		const { error } = await supabase.auth.signOut();
		if (error) throw new Error("Error signing out");

		Cookies.remove("adminData");
		setAdminData(null);

		console.log("Logout successful");

		navigate("/");
	} catch (err) {
		console.log("Logout error:", err);
	}
};
