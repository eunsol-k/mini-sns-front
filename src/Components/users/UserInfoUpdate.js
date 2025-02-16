import { HttpStatusCode } from "axios";
import instance from "../utils/axios-interceptors"
import { SERVER_ROOT } from '../config/config'
import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { CardContext } from "../context/CardProvider"

export default function UserInfoUpdate() {
	const navigate = useNavigate();

	const { auth } = useContext(AuthContext)
	const { userInfo, setUserInfo, getUserInfo } = useContext(CardContext)

	const [introduction, setIntroduction] = useState(userInfo.introduction);
	const [introEmail, setIntroEmail] = useState(userInfo.contactEmail);
	const [introLink, setIntroLink] = useState(userInfo.contactLink);
	const [file, setFile] = useState(null)

	function saveFile(event) {
		const file = event.target.files[0]
		setFile(file)
	}

	const update = async (event) => {
		event.preventDefault()
		const requestDto = {
			introduction: introduction,
			contactEmail: introEmail,
			contactLink: introLink
		}

		const formData = new FormData()
		formData.append('file', file)

		await instance({
			method: 'PATCH',
			url: `${SERVER_ROOT}/users/${auth}`,
			data: requestDto,
		})
			.then(res => {
				console.log("[update-userinfo] > " + JSON.stringify(res.data));

				if (res.status === HttpStatusCode.Ok) {
					setUserInfo((prev) => {
						return {
							...userInfo,
							['introduction']: introduction,
							['contactEmail']: introEmail,
							['contactLink']: introLink
						};
					});
				} else {
					// alert(`⚠️ ${res.data.resultMsg}`)
				}
			})
			.catch(err => {
				console.log("[update-userinfo] > " + err);
			})

		await instance({
			method: 'POST',
			url: `${SERVER_ROOT}/users/profile`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
			.then(res => {
				console.log("[update-userprofile] > " + JSON.stringify(res.data));

				if (res.status === HttpStatusCode.Created) {
					console.log("")
					setUserInfo((prev) => {
						return {
							...userInfo,
							['profileIdx']: res.data.resultData
						};
					});
				} else {
					// alert(`⚠️ ${res.data.resultMsg}`)
				}
			})
			.catch(err => {
				console.log("[update-userprofile] > " + err);
			})

		navigate(`/users/${auth}`)
	}

	return (
		<>
			<div className="write-container">
				<textarea value={introduction} onChange={e => setIntroduction(e.target.value)} className="write-contents" type="text" id="introduction" name="introduction" placeholder="소갯말을 입력하세요." ></textarea>

				<input onChange={e => setIntroEmail(e.target.value)} type="text" value={introEmail} id="introEmail" name="introEmail" placeholder="이메일을 입력하세요." />

				<input onChange={e => setIntroLink(e.target.value)} type="text" value={introLink} id="introLink" name="introLink" placeholder="웹사이트 주소를 입력하세요." />

				<input onChange={saveFile} type="file" id="file" name="file" />
			</div>
			<button className="write-btn" onClick={update}>작성</button>
		</>
	)
}