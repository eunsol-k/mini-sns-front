import { HttpStatusCode } from "axios"
import instance from "../utils/axios-interceptors"
import React, { useEffect, useState, createContext, useContext } from "react"
import { SERVER_ROOT } from '../config/config'
import { AuthContext } from "./AuthProvider";

export const CardContext = createContext();

const CardProvider = ({children}) => {
    const {auth} = useContext(AuthContext)

    const [cardList, setCardList] = useState([]);
    const [cardDetail, setCardDetail] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [userMediaList, setUserMediaList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [muteList, setMuteList] = useState([]);
    const [isUserPage, setIsUserPage] = useState(false)
    const [isMediaPage, setMediaPage] = useState(false)
    const [isDetailPage, setIsDetailPage] = useState(false)
    const [cardDetailIdx, setCardDetailIdx] = useState(0)
    const [username, setUsername] = useState("")

    const getCardList = async () => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/`
        })
        .then(res => {
            const response = res.data
            console.log("[getCardList] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setCardList(response.resultData.cardList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getCardList] > " + err);
        })
    }

    const getUserCardDetail = async (cardIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/card/${cardIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserCardDetail] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setCardDetail(response.resultData)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserCardDetail] > " + err);
        })
    }

    const getUserCardList = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/cards`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserCardList] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setCardList(response.resultData.cardList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserCardList] > " + err);
        })
    }

    const getUserInfo = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserInfo] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setUserInfo(response.resultData)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserInfo] > " + err);
        })
    }

    const getUserMedias = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/medias`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserMedias] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setUserMediaList(response.resultData.mediaList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserMedias] > " + err);
        })
    }

    const getUserLikeList = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/likes`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserLikeList] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                console.log("response.resultData: " + response.resultData)
                setCardList(response.resultData.cardList)
            } else {
                console.log(`[getUserLikeList] > ${response.resultMsg}`);
            }
        })
        .catch(err => {
            console.log("[getUserLikeList] > " + err);
        })
    }

    const getUserFollower = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/follower`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserFollower] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setFollowerList(response.resultData.userList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserFollower] > " + err);
        })
    }

    const followUser = async (loginedUserIdx, followUserIdx) => {
        await instance({
            method: 'POST',
            url: `${SERVER_ROOT}/follow/${followUserIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[followUser] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Created) {
                getUserFollowing(loginedUserIdx)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[followUser] > " + err);
        })
    }

    const unfollowUser = async (unfollowUserIdx) => {
        await instance({
            method: 'DELETE',
            url: `${SERVER_ROOT}/follow/${unfollowUserIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[unfollowUser] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                const newFollowList = followingList.filter(following => following.seq !== unfollowUserIdx)
                console.log("newFollowList: " + JSON.stringify(newFollowList))
                setFollowingList(newFollowList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[unfollowUser] > " + err);
        })
    }

    const getUserFollowing = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/following`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserFollowing] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setFollowingList(response.resultData.userList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserFollowing] > " + err);
        })
    }

    const getUserMuteList = async (userIdx) => {
        await instance({
            method: 'GET',
            url: `${SERVER_ROOT}/users/${userIdx}/mute`
        })
        .then(res => {
            const response = res.data
            console.log("[getUserMuteList] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Ok) {
                setMuteList(response.resultData.userList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[getUserMuteList] > " + err);
        })
    }

    const muteUser = async (userIdx, muteUserIdx) => {
        await instance({
            method: 'POST',
            url: `${SERVER_ROOT}/mute/${muteUserIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[muteUser] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Created) {
                getUserMuteList(userIdx)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[muteUser] > " + err);
        })
    }

    const unmuteUser = async (userIdx, muteUserIdx) => {
        await instance({
            method: 'DELETE',
            url: `${SERVER_ROOT}/mute/${muteUserIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[unmuteUser] > " + JSON.stringify(response));
            
            if (response.statusCode === HttpStatusCode.Created) {
                getUserMuteList(userIdx)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[unmuteUser] > " + err);
        })
    }

    const removeCard = async cardIdx => {
        await instance({
            method: 'DELETE',
            url: `${SERVER_ROOT}/card/${cardIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[removeCard] > " + JSON.stringify(response));
            if (res.status === HttpStatusCode.Ok) {
                const newCardList = cardList.filter(card => card.cardIdx !== cardIdx)
                setCardList(newCardList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[removeCard] > " + err);
        })
    }

    const toggleLikeCard = async cardIdx => {
        let method = null
        const selectedCard = cardList.filter(card => card.cardIdx == cardIdx)

        if (selectedCard[0].liked)
            method = "DELETE"
        else
            method = "POST"

        await instance({
            method: method,
            url: `${SERVER_ROOT}/like/${cardIdx}`
        })
        .then(res => {
            const response = res.data
            console.log("[toggleLikeCard] > " + JSON.stringify(response));
            if (res.status === HttpStatusCode.Created || res.status === HttpStatusCode.Ok) {
                const newCardList = cardList.map(card => {
                    if (card.cardIdx == cardIdx) {
                        card.liked = !card.liked
                    }
                    return card
                })
                setCardList(newCardList)
            } else {
                // alert(`⚠️ ${response.resultMsg}`)
            }
        })
        .catch(err => {
            console.log("[toggleLikeCard] > " + err);
        })
    }

    // 첫 로딩 시 카드 리스트 조회
    useEffect(() => {
        if (isUserPage) {
            getUserCardList(username)
            getUserInfo(username)
            getUserMedias(username)

            if (auth !== null) {
                getUserLikeList(username)
            }
            
            getUserFollower(username)
            getUserFollowing(username)
        } else {
            getCardList()
        }
    }, [isUserPage])

    return (
        <CardContext.Provider value={{getCardList, cardList, cardDetail, setCardDetail, removeCard, toggleLikeCard, userInfo, userMediaList, followerList, followingList, muteList, getUserCardList, getUserCardDetail, getUserInfo, getUserMedias, getUserLikeList, getUserFollower, followUser, unfollowUser, getUserFollowing, getUserMuteList, muteUser, unmuteUser, isUserPage, setIsUserPage, isMediaPage, setMediaPage, username, setUsername, isDetailPage, setIsDetailPage, cardDetailIdx, setCardDetailIdx, setUserInfo}}>
            {children}
        </CardContext.Provider>
    )
}

export default CardProvider