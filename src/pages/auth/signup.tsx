import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo-mini.jpg";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "@/api/auth";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast, Toaster } from "sonner";
import { useOfficeStore } from "@/store/data";

const Signup: React.FC = () => {
	const { offices, fetchOffices } = useOfficeStore();
	const navigate = useNavigate();

	const [isCreateOffice, setIsCreateOffice] = useState(false);
	const [office, setOffice] = useState<number | null>(null);
	const nameInputRef = useRef<HTMLInputElement | null>(null);
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const passwordInputRef = useRef<HTMLInputElement | null>(null);
	const officeInputRef = useRef<HTMLInputElement | null>(null);
	const designationInputRef = useRef<HTMLInputElement | null>(null);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		const name = nameInputRef.current?.value;
		const email = emailInputRef.current?.value;
		const password = passwordInputRef.current?.value;
		const designation = designationInputRef.current?.value;
		const officeId = isCreateOffice ? null : office;

		if (
			!name ||
			!email ||
			!password ||
			!designation ||
			(!officeId && !isCreateOffice)
		) {
			toast.error("Please fill all required fields.");
			return;
		}

		const input = {
			name,
			email,
			password,
			designation,
			office_id: officeId,
			office_input_ref: officeInputRef.current?.value,
		};

		try {
			const adminData = await handleSignUp(input);
			if (adminData) {
				toast.success("Account newly registered successful!");

				setTimeout(() => {
					navigate("/");
				}, 3000);
			}
		} catch (err) {
			toast.error("Signup failed. Please try again.");
			console.error("Signup error:", err);
		}
	};

	useEffect(() => {
		fetchOffices();
	}, [fetchOffices]);

	return (
		<div className='font-main'>
			<Toaster
				richColors
				position='bottom-right'
			/>
			<div className='xxxxs:flex flex-col gap-4 md:w-full h-screen grid place-items-center'>
				<form
					onSubmit={handleSignup}
					className='xxxxs:mt-8 lg: px-8 xs:w-full md:w-10/12 lg:w-4/12'>
					<img
						src={logo}
						alt='iTour Admin'
						className='xxxxs:w-20 h-20 m-auto'
					/>
					<h1 className='font-semibold text-center text-primary'>iTour Admin</h1>
					<h1 className='font-bold text-center my-3 xxxxs:text-xl md:text-2xl lg:text-3xl'>
						Sign up
					</h1>
					<div className='flex flex-col mt-4'>
						<label htmlFor='username'>Complete Name</label>
						<input
							type='text'
							ref={nameInputRef}
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							ref={emailInputRef}
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>
					<div className='flex flex-col mt-4'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
							ref={passwordInputRef}
						/>
					</div>
					<div className='flex justify-between items-center'>
						<div className='flex gap-3 items-center'>
							<input
								onClick={() => setIsCreateOffice(!isCreateOffice)}
								type='checkbox'
							/>
							<h1 className='text-sm'>Office not found? Create new office</h1>
						</div>
						<div className='flex flex-col'>
							<Dropdown
								className='w-full mt-4 rounded-md text-primary focus:outline-none'
								//eslint-disable-next-line
								//@ts-ignore
								options={offices?.map((office) => ({
									value: office.id,
									label: office.office_name,
								}))}
								onChange={(selected) => setOffice(Number(selected.value))}
								placeholder='Select Office'
							/>
						</div>
					</div>
					{isCreateOffice && (
						<div className='flex flex-col'>
							<label htmlFor='password'>Office Name</label>
							<input
								type='text'
								className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
								ref={officeInputRef}
							/>
						</div>
					)}
					<div className='flex flex-col'>
						<label htmlFor='password'>Designation</label>
						<input
							type='text'
							className='border-2 border-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
							ref={designationInputRef}
						/>
					</div>
					<button
						onClick={handleSignup}
						className='w-full mt-3 bg-primary text-center bg-primGreen text-white rounded-lg py-2 font-semibold '>
						Sign Up
					</button>
					<p className='mt-4 text-zinc-400 xxxxs:text-base md:flex place-content-center'>
						Already have an account?{" "}
						<span className='underline text-primary ml-2'>
							<Link to='/'>Log In</Link>
						</span>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
