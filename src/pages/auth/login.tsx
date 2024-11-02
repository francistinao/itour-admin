import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import supabase from "@/lib/supabase";
import logo from "@/assets/logo-mini.jpg";
import bg from "@/assets/bg.jpg";

const Login: React.FC = () => {
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const passwordInputRef = useRef<HTMLInputElement | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = emailInputRef?.current?.value as unknown as string;
		const password = passwordInputRef?.current?.value as unknown as string;

		if (!email || !password) {
			toast.error("Please input all fields!");
			return;
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			toast.error("Invalid credentials. Please try again.");
			return;
		}

		console.log(data);

		// localStorage.setItem("token", data.access_token);
		// localStorage.setItem(
		// 	"admin",
		// 	JSON.stringify({
		// 		branch_id: userData[0].branch_id,
		// 		email,
		// 		id: data?.user?.id,
		// 		name: userData[0]?.first_name + " " + userData[0]?.last_name,
		// 		role: userData[0]?.role,
		// 		branch_name: branchData[0].branch_name,
		// 	})
		// );

		window.location.href = "/dashboard";
	};

	useEffect(() => {
		document.title = "iTour - Admin";
	}, []);

	return (
		<div className='font-main'>
			<Toaster
				position='bottom-right'
				richColors
			/>
			<div className='flex'>
				<form
					onSubmit={(e) => handleLogin(e)}
					className='xs:mt-32 md:mt-36 lg:mt-44 px-8 xs:w-full md:w-11/12 lg:w-6/12'>
					<Link to='/'>
						<img
							src={logo}
							alt='JGS POS'
							className='my-4 xs:w-20 h-20'
						/>
					</Link>
					<h1 className='font-bold text-3xl xs:text-sm'>iTour Admin Panel</h1>
					<h1 className='font-semibold xs:text-3xl'>Welcome!</h1>
					<p>Start creating and managing events.</p>
					<div className='flex flex-col mt-4'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							required
							ref={emailInputRef}
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full`}
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							required
							className={`border border-gray-300 rounded-md p-2 mt-4 w-full `}
							ref={passwordInputRef}
						/>
					</div>
					<button
						onClick={handleLogin}
						className='w-full bg-secGreen text-white py-2 text-center  font-semibold rounded-md mt-4'>
						Log in
					</button>
				</form>
				<img
					src={bg}
					alt='iTour'
					draggable={false}
					className='hidden md:block h-screen w-full	object-cover'
				/>
			</div>
		</div>
	);
};

export default Login;
