import { Routes, Route } from "react-router-dom";
import Home from '../app/Home'
import UserHome from "../users/UserHome";
import Join from '../auth/Join'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
import UserInfoUpdate from '../users/UserInfoUpdate'
import CardDetail from "../card/Card-detail";
import CardWrite from "../card/Card-write";

function Router() {

	return (
			<Routes>
				{/* home */}
				<Route path="/" element={<Home />}></Route>
				<Route path="/users/:username" element={<UserHome />}></Route>

				{/* auth */}
				<Route path="/join" element={<Join />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/logout" element={<Logout />}></Route>

				{/* users */}
				<Route path="/users/:username/update" element={<UserInfoUpdate />}></Route>

				{/* card */}
				<Route path="/card/:cardIdx" element={<CardDetail />}></Route>
				<Route path="/write" element={<CardWrite />}></Route>
			</Routes>
	);
}

export default Router;