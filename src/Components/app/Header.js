import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CardContext } from "../context/CardProvider"

export default function Header() {
    const navigate = useNavigate()
    const { setIsUserPage } = useContext(CardContext)

    const goHome = async () => {
        setIsUserPage(false)
        navigate("/")
    }
    return (
        <>
            <h2 className="libre-baskerville-bold title" onClick={() => goHome()}>PICO-SNS</h2>
        </>
    )
}