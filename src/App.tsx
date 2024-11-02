import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Signup } from "@/pages/auth";
import { Overview, Events } from "@/pages/dashboard";
import Preload from "@/pages/preload";
import "@radix-ui/themes/styles.css";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		preLoaderAsyncCall().then(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <Preload />;
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/overview'
					element={<Overview />}
				/>
				<Route
					path='/events'
					element={<Events />}
				/>
			</Routes>
		</Router>
	);
}

const preLoaderAsyncCall = (): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, 4000));
};

export default App;
