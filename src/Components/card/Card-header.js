import { useContext } from "react"
import { CardContext } from "../context/CardProvider"
import { FiMoreVertical } from "react-icons/fi";
import { toggleModal } from "../utils/modal"
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SERVER_ROOT } from "../config/config";

export default function CardHeader({ card }) {
    const { removeCard, isDetailPage } = useContext(CardContext)
    const { auth, setAuth } = useContext(AuthContext)
    const { isUserPage, setIsUserPage, setIsDetailPage, setUsername, setCardDetailIdx } = useContext(CardContext)

    const navigate = useNavigate()

    const goCreatorPage = async (e, creatorId) => {
        if(isUserPage) {
            toggleModal(e)
        }

        setUsername(creatorId)
        setIsUserPage(true)
        navigate(`/users/${creatorId}`);
    }

    const goCardPage = (cardIdx) => {
        /*
        setCardDetailIdx(card.cardIdx)
        setIsUserPage(false)
        setIsDetailPage(true)
        
        console.log("[goCardPage cardIdx: ", card.cardIdx)
        console.log("[goCardPage] isDetailPage? ", isDetailPage)
        */

        navigate(`/card/${cardIdx}`);
    }

    function getImgSrc(profileId) {
        if (profileId == 0)
            return "/default_profile.png"
        else {
            return `${SERVER_ROOT}/profile/downloads/${profileId}`
        }
    }

    console.log("auth: " + auth)
    console.log("card.creatorId: " + card.creatorId)

    return (
        <>
            <dialog id="card-modal">
                <article>
                    <ul>
                        {(auth == card.creatorId) && <li className="li-delete" onClick={() => removeCard(card.cardIdx)}>삭제</li>}
                        <li onClick={() => goCardPage(card.cardIdx)}>게시물로 이동</li>
                        <li data-target="card-modal" onClick={(e) => goCreatorPage(e, card.creatorId)}>이 계정 정보</li>
                        <li data-target="card-modal" onClick={toggleModal}>취소</li>
                    </ul>
                </article>
            </dialog>

            <div className="info-header">
                <div className="info">
                    <img className="round-image" src={getImgSrc(card.creatorProfileIdx)} alt={card.creatorName} />
                    <div className="profile-info">
                        <div className="creator-name">{card.creatorName}</div>
                        <div className="account-name">{`@${card.creatorAccount}`}</div>
                    </div>
                    <div className="createdDate">{card.createdDatetime.substr(0, 10)}</div>
                </div>
                <div className="vertical-dot" data-target="card-modal" onClick={toggleModal} >
                    <FiMoreVertical size="1.5em" className="vertical-dot-svg" />
                </div>
            </div>
        </>
    )
}