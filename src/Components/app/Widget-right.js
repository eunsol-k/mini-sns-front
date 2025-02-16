import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function WidgetRight() {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="widget-right">
            <div className="widget-right-auth">
                {
                    auth && auth !== null && (
                        <div onClick={() => navigate('/write')}>
                            <button className="widget-right-write-btn"><FaPencil size="3.5em" /></button>
                        </div>
                    )
                }
                {
                    auth === null && (
                        <>
                            <div className="square">
                                <div className="widget-right-hello">어서 오세요! 오늘 하루는 어땠나요?</div>
                                <div>
                                    <button className="secondary btn-top widget-btn" onClick={() => navigate('/login')}>로그인</button>
                                    <button className="secondary btn-bottom widget-btn" onClick={() => navigate('/join')}>회원가입</button>
                                </div>
                            </div>
                        </>
                    )
                }
                                {
                    auth && auth !== null && (
                        <>
                            <div className="square">
                                <div className="widget-right-hello">어서 오세요! 오늘 하루는 어땠나요?</div>
                                <div>
                                    <button className="secondary btn-bottom widget-btn" onClick={() => navigate(`/users/${auth}`)}>내 화면으로</button>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    auth && auth !== null && (
                        <>
                            <div className="logout" onClick={() => navigate('/logout')}>
                            <small>로그아웃</small>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}