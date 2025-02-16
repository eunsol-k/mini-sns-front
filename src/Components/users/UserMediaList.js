import { useContext } from "react"
import { CardContext } from "../context/CardProvider"
import { SERVER_ROOT } from "../config/config";

export default function UserMediaList() {
    const { userMediaList } = useContext(CardContext)

    return (
        <div className="media-img-list">
        {
            userMediaList && userMediaList.length > 0 && userMediaList.map(media => (
                <div key={media.mediaIdx} className="media-img-container">
                    <img className="media-img"  src={`${SERVER_ROOT}/file/downloads/${media.mediaIdx}`} alt={media.mediaIdx} />
                </div>
            ))
        }
        </div>
    )
}