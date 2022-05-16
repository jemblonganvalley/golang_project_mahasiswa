import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";

const App = () => {
	const [isLogin, setIsLogin] = React.useState(false);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/data" element={<Data />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
