import { HttpStatusCode } from "axios";
import instance from "../utils/axios-interceptors"
import { SERVER_ROOT } from '../config/config'
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { CardContext } from "../context/CardProvider";

function Logout() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext)
	const { cardList, setCardList } = useContext(CardContext)

	const navigate = useNavigate();
	
	const logout = async () => {
		await instance.post(`${SERVER_ROOT}/logout`)
			.then((res) => {
				console.log("[logout] > " + res.data);

				localStorage.removeItem("access_token");
				localStorage.removeItem("username");

				setAuth(null);
				setHeaders(null);
				setCardList(null);
				
				navigate("/");

			}).catch((err) => {
				console.log("[logout] > " + err);
			});
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;