import { useContext, useEffect } from "react"
import { CardContext } from "../context/CardProvider"
import { useParams } from "react-router-dom";
import Card from "./Card"

export default function CardDetail() {
    const { cardList, cardDetail, setIsDetailPage, isDetailPage,  setIsUserPage, setCardDetailIdx } = useContext(CardContext)

    const params = useParams();
    const cardIdx = params.cardIdx;

    console.log("params: ", params)
    console.log("cardIdx: ", cardIdx)

    /*
    useEffect(() => {
        setCardDetailIdx(cardIdx)
        setIsUserPage(false)
        setIsDetailPage(true)
    }, [])
    */

    console.log("cardList: ", cardList)
    const selectedCard = cardList.filter(card => card.cardIdx == cardIdx)

    return (
        <>
            <div id="card-detail">
                <div>
                    <Card key={cardIdx} card={selectedCard[0]} />
                </div>
            </div>
        </>
    )
}