/* 로그인 컴포넌트 */

import { HttpStatusCode } from "axios";
import instance from "../utils/axios-interceptors"
import { SERVER_ROOT } from '../config/config'
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import CardProvider, { CardContext } from "../context/CardProvider";

function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const changeUsername = (event) => {
		setUsername(event.target.value);
	}

	const changePassword = (event) => {
		setPassword(event.target.value);
	}

	const login = async (event) => {
		event.preventDefault()

		const formData = new FormData()
		formData.append('username', username)
		formData.append('password', password)

		await instance({
			method: 'POST',
			url: `${SERVER_ROOT}/login`,
			data: formData
		})
			.then(res => {
				if (res.status === HttpStatusCode.Ok) {
					// JWT 토큰 저장
					let accessToken = res.headers['token']
					let username = res.headers['username']

					localStorage.setItem("access_token", accessToken);
					localStorage.setItem("username", username);

					setAuth(username); // 사용자 인증 정보(account 저장)
					setHeaders({ "Authorization": `Bearer ${accessToken}` }); // 헤더 Authorization 필드 저장

					navigate("/");
				} else {
					alert(`⚠️ 로그인에 실패했습니다.`)
				}
			})
			.catch(err => {
				console.log("[login] > " + err);
			})
	}

	return (
		<>
			<div className="login-format grid">
				<input type="text" value={username} placeholder="계정 또는 이메일" required onChange={changeUsername} size="3em" />
				<input type="password" value={password} placeholder="비밀번호" required onChange={changePassword} size="3em" />
			</div>
			<div className="login-btn-format grid">
				<button className="login-submit secondary" onClick={login}>로그인</button>
			</div>
		</>
	);
}

export default Login;