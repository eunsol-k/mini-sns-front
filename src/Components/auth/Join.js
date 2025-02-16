/* 회원가입 컴포넌트 */

import { HttpStatusCode } from "axios";
import instance from "../utils/axios-interceptors"
import { SERVER_ROOT } from '../config/config'
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Join() {
	const [account, setAccount] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const changeAccount = (event) => {
		setAccount(event.target.value);
	}

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePassword = (event) => {
		setPassword(event.target.value);
	}

	const changePasswordConfirm = (event) => {
		setPasswordConfirm(event.target.value);
	}

	const changeEmail = (event) => {
		setEmail(event.target.value);
	}

	/* 회원가입 */
	const join = async (event) => {
		event.preventDefault()

		const requestDto = {
			account, name, password, passwordConfirm, email
		}

		await instance.post(`${SERVER_ROOT}/register`, requestDto)
			.then((res) => {
				const response = res.data
				console.log("[join] > " + res.data);

				if (response.statusCode === HttpStatusCode.Created) {
					alert(`${response.resultMsg}`)
				} else {
					alert(`⚠️ ${response.resultMsg}`)
				}

				navigate("/login");

			}).catch((err) => {
				console.log("[join] > " + err);
			});
	}

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="col-2">계정</th>
						<td>
							<input type="text" value={account} onChange={changeAccount} size="50px" />
						</td>
					</tr>

					<tr>
						<th>이메일</th>
						<td>
							<input type="text" value={email} onChange={changeEmail} size="50px" />
						</td>
					</tr>

					<tr>
						<th>이름</th>
						<td>
							<input type="text" value={name} onChange={changeName} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={password} onChange={changePassword} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호 확인</th>
						<td>
							<input type="password" value={passwordConfirm} onChange={changePasswordConfirm} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
			</div>

		</div>
	);
}

export default Join;
