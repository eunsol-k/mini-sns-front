import { FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane } from "react-icons/fa";
import { useContext } from "react"
import { CardContext } from "../context/CardProvider"


export default function CardFooter({card}) {
    const { toggleLikeCard } = useContext(CardContext)

    return (
        <div className="footer">
            <div className="icons">
                <div className={`btn-like ${(card.liked) ? 'on' : ''}`} onClick={() => toggleLikeCard(card.cardIdx)}>
                    { (card.liked) ? <FaHeart size="1.5em" /> : <FaRegHeart size="1.5em" /> }
                </div>
                <div><FaRegComment size="1.5em" /></div>
                <div><FaRegPaperPlane size="1.5em" /></div>
                <div className="icons-final"></div>
            </div>
        </div>
    )
}