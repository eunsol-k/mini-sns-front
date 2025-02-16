import { useContext, useEffect } from "react"
import CardList from "../card/CardList"
import { CardContext } from "../context/CardProvider"
import { AuthContext } from "../context/AuthProvider"

export default function Home() {
    const {cardList, getCardList} = useContext(CardContext)
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        getCardList()
    }, [])

    return (
        <>  
            {
                cardList && cardList.length > 0 && <CardList />
            }
            {
                auth === null && (cardList === null || cardList.length < 1) && <h2 className="try-login">로그인해 주세요.</h2>
            }
            {
                auth !== null &&  (cardList === null || cardList.length < 1) && <h2 className="try-login">게시물이 존재하지 않습니다.</h2>
            }
        </>
    )
}