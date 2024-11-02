import React from "react";
import { IconType } from "react-icons";

interface CardProps {
	icon: IconType;
	label: string;
	description: string;
	value: number;
	bgColor: string;
}

export const Card: React.FC<CardProps> = ({
	icon: Icon,
	label,
	description,
	value,
	bgColor,
}) => {
	return (
		<div
			className={`flex flex-col items-start justify-between p-4 rounded-lg shadow-md text-white ${bgColor}`}>
			<Icon className='w-8 h-8 mb-2' />
			<div>
				<h2 className='text-lg font-bold'>{label}</h2>
				<p className='text-sm'>{description}</p>
			</div>
			<span className='text-2xl font-extrabold'>{value}</span>
		</div>
	);
};
