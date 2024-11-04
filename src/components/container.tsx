import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { motion } from "framer-motion";
import { handleLogout } from "@/api/auth";

import { useAdminStore } from "@/store/data";

interface ContainerProps {
	children: React.ReactNode;
}

const contentVariants = {
	open: { opacity: 1, transition: { duration: 0.3 } },
	closed: { opacity: 0.5, transition: { duration: 0.3 } },
};

const hoverVariants = {
	hover: {
		scale: 1.05,
		backgroundColor: "#2f855a",
		transition: { type: "spring", stiffness: 200 },
	},
};

const Container: React.FC<ContainerProps> = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { adminData, loadAdminData } = useAdminStore();

	const isTokenExpired = (expiresAt: number) => {
		const currentTime = Math.floor(Date.now() / 1000);
		return expiresAt <= currentTime;
	};

	useEffect(() => {
		const loadSessionData = async () => {
			if (!adminData) {
				navigate("/");
			} else {
				const session =
					typeof adminData?.response?.data === "string"
						? JSON.parse(adminData.response.data)
						: adminData?.response?.data;

				if (
					!session?.session?.access_token ||
					isTokenExpired(session?.session?.expires_at)
				) {
					navigate("/");
				}
			}
		};

		loadSessionData();
	}, [navigate, adminData, loadAdminData]);

	const navItems = [
		{ name: "Overview", path: "/overview", icon: <FaHome /> },
		{ name: "Events", path: "/events", icon: <FaCalendarAlt /> },
	];

	return (
		<div className='font-main flex h-screen bg-gray-100'>
			<motion.aside
				className='fixed md:relative z-10 w-64 bg-primGreen text-white'
				initial='closed'
				animate='open'
				exit='closed'>
				<div className='p-6 text-2xl font-bold'>ITour</div>
				<nav className='mt-4'>
					<ul>
						{navItems.map((item) => (
							<motion.li
								key={item.name}
								variants={hoverVariants}
								whileHover='hover'>
								<Link
									to={item.path}
									className={`flex items-center p-4 space-x-3 ${
										location.pathname === item.path ? "bg-secGreen" : ""
									}`}>
									{item.icon}
									<span>{item.name}</span>
								</Link>
							</motion.li>
						))}
					</ul>
				</nav>
			</motion.aside>

			<motion.div
				className='flex flex-col flex-1 ml-64 md:ml-0'
				variants={contentVariants}
				initial='closed'
				animate='open'>
				<header className='bg-white shadow p-4 flex justify-between items-center'>
					<div className='text-xl font-extrabold text-primGreen'>
						Welcome to iTour Admin
					</div>
					<div className='flex items-center space-x-6'>
						<div className='flex flex-col'>
							<h1 className='font-semibold'>{adminData?.name}</h1>
							<h1>{adminData?.designation}</h1>
						</div>
						<div className='flex items-center space-x-2 cursor-pointer'>
							<button onClick={() => handleLogout(navigate)}>
								<IoLogOut size={25} />
							</button>
						</div>
					</div>
				</header>

				<main className='flex-1 p-6 overflow-auto'>{children}</main>
			</motion.div>
		</div>
	);
};

export default Container;
