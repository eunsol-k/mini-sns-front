import { useContext } from "react"
import { CardContext } from "../context/CardProvider"
import { SERVER_ROOT } from "../config/config"
import { FiMoreVertical } from "react-icons/fi";
import { LuMail, LuLink } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../utils/modal"

export default function UserInfo() {
    const { userInfo, username, followingList, followerList, getUserLikeList, getUserCardList, setMediaPage, muteUser, unmuteUser, getUserMuteList, setUserPage, followUser, unfollowUser, setUsername, setIsUserPage, setIsDetailPage } = useContext(CardContext)
    const loginedUser = localStorage.getItem("username")

    const navigate = useNavigate()
    console.log("userInfo: ", userInfo)

    const { account, name, profileIdx,
        introduction, contactEmail, contactLink,
        followerNum, followingNum } = userInfo

    function amIfollowing() {
        let isTrue = false
        if (followingList === null)
            return false
        followingList.forEach(following => {
            console.log("following: " + JSON.stringify(following))
            if (following.seq == loginedUser) {
                console.log("true임")
                isTrue = true
            }
        })

        return isTrue
    }

    function amImute() {
        if (getUserMuteList === null)
            return false
        getUserMuteList.map(muteUser => {
            if (muteUser.seq == username) {
                return true
            }
        })

        return false
    }

    function onClickCard() {
        setMediaPage(false)
        getUserCardList(username)
    }

    function onClickLike() {
        setMediaPage(false)
        getUserLikeList(username)
    }

    function onClickFollow(userIdx) {
        followUser(loginedUser, userIdx)
    }

    function onClickUnFollow(userIdx) {
        unfollowUser(userIdx)
    }

    function toggleClickMute() {
        if (amImute()) {
            unmuteUser(loginedUser, username)
        } else {
            muteUser(loginedUser, username)
            setUserPage(false)
            navigate("/")
        }
    }

    function getImgSrc(profileId) {
        if (profileId == 0)
            return "/default_profile.png"
        else {
            return `${SERVER_ROOT}/profile/downloads/${profileId}`
        }
    }

    const goUserPage = async (e, userId) => {
        toggleModal(e)
        console.log(userId)

        setUsername(userId)
        setIsUserPage(true)
        navigate(`/users/${userId}`);
    }

    return (
        <>
            <dialog id="user-modal">
                <article>
                    <ul>
                        {(loginedUser == username) ? <li onClick={() => navigate(`/users/${username}/update`)}>계정 프로필 수정</li> : null}
                        {(loginedUser != username) ? <li className="li-delete" onClick={() => toggleClickMute()}>뮤트</li> : null}
                        <li data-target="user-modal" onClick={toggleModal}>취소</li>
                    </ul>
                </article>
            </dialog>

            <dialog id="following-modal">
                <article>
                    <ul>
                        {
                            followingList && followingList.length > 0 && followingList.map(following => (
                                <li key={following.seq}>
                                    <div className="follow-item" data-target="following-modal" onClick={(e) => goUserPage(e, following.seq)}>
                                        <img className="follow-img" src={getImgSrc(following.profileIdx)} alt={following.profileIdx} />
                                        <div className="follow-item-info">
                                            <div className="follow-item-info-name">{following.name}</div>
                                            <div className="follow-item-info-account">{`@${following.account}`}</div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </article>
            </dialog>

            <dialog id="follower-modal">
                <article>
                    <ul>
                        {
                            followerList && followerList.length > 0 && followerList.map(follower => (
                                <li key={follower.seq}>
                                    <div className="follow-item" data-target="follower-modal" onClick={(e) => goUserPage(e, follower.seq)}>
                                        <img className="follow-img" src={getImgSrc(follower.profileIdx)} alt={follower.profileIdx} />
                                        <div className="follow-item-info">
                                            <div className="follow-item-info-name">{follower.name}</div>
                                            <div className="follow-item-info-account">{`@${follower.account}`}</div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </article>
            </dialog>

            <div className="follow-div">
                <div className="follow-div-first"></div>
                {
                    (loginedUser != username) && amIfollowing() && (
                        <>
                            <button onClick={() => onClickUnFollow(username)} className="follow-div-second secondary">언팔로우</button>
                        </>
                    )
                }
                {
                    (loginedUser != username) && !amIfollowing() && (
                        <>
                            <button onClick={() => onClickFollow(username)} className="follow-div-second">팔로우</button>
                        </>
                    )
                }
                <div className="info-vertical-dot" data-target="user-modal" onClick={toggleModal} >
                    <FiMoreVertical size="1.5em" className="info-vertical-dot-svg" />
                </div>
            </div>
            <div className="user-info-flex">
                <div className="user-profile">
                    <img className="user-profile-image" src={getImgSrc(profileIdx)} alt={profileIdx} />
                </div>
                <div className="user-profile-info">
                    <div className="user-info-name">{name}</div>
                    <div className="user-info-account">{`@${account}`}</div>
                    <div className="user-info-introduction">{introduction}</div>
                </div>
                <div className="user-contact grid">
                    <div className="user-info-email">{
                        contactEmail && (
                            <>
                                <LuMail />   {contactEmail}
                            </>
                        )
                    }</div>
                    <div className="user-info-link">{
                        contactLink && (
                            <>
                                <LuLink />   {contactLink}
                            </>
                        )
                    }</div>
                </div>
                <div className="user-profile-follow">
                    <div data-target="following-modal" onClick={toggleModal}>{followingNum} 팔로우</div>
                    <div data-target="follower-modal" onClick={toggleModal}>{followerNum} 팔로워</div>
                </div>
            </div>
            <div className="info-label grid">
                <div onClick={() => onClickCard()}>게시물</div>
                <div onClick={() => setMediaPage(true)}>미디어</div>
                {
                    (loginedUser == username) && <div onClick={() => onClickLike()}>좋아요</div>
                }
            </div>
        </>
    )
}