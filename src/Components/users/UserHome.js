import { useContext, useEffect } from "react"
import { CardContext } from "../context/CardProvider"
import CardList from "../card/CardList"
import UserInfo from "./UserInfo"
import { useParams } from "react-router-dom"
import UserMediaList from "./UserMediaList"

export default function UserHome() {
    const params = useParams();
    const pathParam = params.username;
    const { setIsUserPage, setUsername, isMediaPage, setIsDetailPage } = useContext(CardContext)

    useEffect(() => {
        setUsername(pathParam)
        setIsUserPage(true)
    }, [])

    return (
        <>
            <UserInfo />
            {
                isMediaPage ? <UserMediaList /> : <CardList /> 
            }
        </>
    )
}