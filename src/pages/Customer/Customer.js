import "./Customer.css";
import { Routes, Route, Link } from "react-router-dom";
import About from "../about/About";
import Planets from '../planets/Planets';
import Iletisim from '../communication/Iletisim';
import { useEffect, useState } from "react";
import Ticket from "../ticket/Ticket";
import PlanetDetails from "../planetDetails/PlanetDetails";
import AuthModal from "../../components/authModal/AuthModal";

export default function AsideHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access-token'));

    const handleButtonModalClick = (buttonText) => {
        if (buttonText === "Üye Girişi") {
            setIsModalOpen(true);
        } else if (buttonText === "Çıkış Yap") {
            localStorage.removeItem('access-token');
            setAccessToken(null);
        }
    };

    useEffect(() => {
        setAccessToken(localStorage.getItem('access-token'));
    }, []);

    return (
        <div id='customerPageContainer'>
            <article className='headerCustomer'>
                <div className='headerCustomerInfo'>
                    <h1 className="headerTitleStyle">Arcanis</h1>
                    <div className="headerButtonContainer">
                        {accessToken ?
                            <>
                                <a className="headerButtonStyle" onClick={() => handleButtonModalClick("Çıkış Yap")}>Çıkış Yap</a>
                                <Link to="/biletlerim" className="headerButtonStyle borderRL">Biletlerim</Link>
                            </>
                            :
                            <a className="headerButtonStyle" onClick={() => handleButtonModalClick("Üye Girişi")}>Üye Girişi</a>
                        }
                        <Link to="/hakkimizda" className="headerButtonStyle borderRL">Hakkımızda</Link>
                        <Link to="/iletisim" className="headerButtonStyle">İletişim</Link>
                    </div>
                </div>
            </article>
            <article>
                <div className='customerPageBody' >
                    <Routes>
                        <Route path="/" element={<Ticket />} />
                        <Route path="/hakkimizda" element={<About />} />
                        <Route path="/biletlerim" element={<Ticket />} />
                        <Route path="/iletisim" element={<Iletisim />} />
                        <Route path="/planets" element={<Planets />} />
                        <Route path="/planet/:id" element={<PlanetDetails />} />
                    </Routes>
                </div>
            </article>
            {isModalOpen && <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setAccessToken={setAccessToken} pageAuthType={"authLogin"} />}
        </div>
    )
}
