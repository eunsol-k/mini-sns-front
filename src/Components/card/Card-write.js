import { HttpStatusCode } from "axios";
import instance from "../utils/axios-interceptors"
import { SERVER_ROOT } from '../config/config'
import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { CardContext } from "../context/CardProvider"

export default function CardWrite() {
	const navigate = useNavigate();
	const refFiles = useRef()

	const { auth } = useContext(AuthContext)
	const { cardList, getCardList } = useContext(CardContext)

	const [contents, setContents] = useState("");
	const [hashTags, setHashTags] = useState("");
	const [files, setFiles] = useState([])

	function saveFiles(event) {
		const files = event.target.files

		if (files.length > 4) {
			alert('이미지는 최대 4개까지만 업로드 가능합니다.');
			refFiles.current.value = '';
			setFiles([]);
			return;
		}

		setFiles([...files])
	}

	const write = async (event) => {
		event.preventDefault()

		const hashArr = []
		if (hashTags !== null && hashTags !== "") {
			const hashTagsSplited = hashTags.split(',')
			hashTagsSplited.forEach(tag => hashArr.push(tag))
		}

		const data = {
				"nickname": "String", // 닉네임
				"diseases": [ // 질병 목록들
					{
					"name": "String", // 질병 이름
					"contents": "String" // 질병 상세
				}
			]
		}

		const jsonData = JSON.stringify(data)

		const blobData = new Blob([jsonData], { type: 'application/json' });

		const formData = new FormData()
		formData.append('data', blobData)
		formData.append('file', files[0])

		await axios({
			data: formData
		})
			.then(res => {
				console.log("[write] > " + JSON.stringify(res.data));

				if (res.status === HttpStatusCode.Created) {
					getCardList()
					navigate(`/users/${auth}`);
				} else {
					alert(`⚠️ ${res.data.resultMsg}`)
				}
			})
			.catch(err => {
				console.log("[write] > " + err);
			})
	}

	return (
		<>
			<div className="write-container">
				<textarea value={contents} onChange={e => setContents(e.target.value)} className="write-contents" type="text" id="contents" name="contents" placeholder="내용을 입력하세요." ></textarea>

				<input onChange={e => setHashTags(e.target.value)} type="text" value={hashTags} id="hashTags" name="hashTags" placeholder="해시태그를 입력하세요. (ex) 첫 게시글, 오늘의 점심" />

				<input onChange={saveFiles} ref={refFiles} type="file" multiple="multiple" id="files" name="files" />
			</div>
			<button className="write-btn" onClick={write}>작성</button>
		</>
	)
}