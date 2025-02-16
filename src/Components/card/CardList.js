import { useContext } from "react"
import { CardContext } from "../context/CardProvider"
import Card from "../card/Card"

export default function CardList() {
    const { cardList } = useContext(CardContext)

    return (
        <div className="list">
            {
                (!cardList || cardList === null || cardList.length === 0) ? null :
                cardList && cardList.map(card => <Card key={card.cardIdx} Key={card.cardIdx} card={card} />)
            }
        </div>
    )
}