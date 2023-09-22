import React, { useState } from "react";
import "../register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import LoginImage from '../../components/loginImage/LoginImage';
import AuthButton from "../../components/button/AuthButton";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from 'antd';

export default function App() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        isActive: true,
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const maskPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length === 10) {
            return `0 (${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 8)}-${phoneNumber.substring(8, 10)}`;
        }
        return phoneNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://lambalog.com/api/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Kullanıcı kaydı yapılamadı.");
            return;
        } else if (values.name === "" || values.surname === "" || values.emailAddress === "" || values.phoneNumber === "" || values.username === "" || values.password === "") {
            setError("Kullanıcı bilgileri boş bırakılamaz");
        } else {
            navigate("/");
            console.log("Kullanıcı Kaydı Başarılı.");
        }

    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-register"><p>{message}</p></div>;
    };

    return (
        <section className="register-body-color">
            <section className="register-container">
                {/* Article Bağlangıç */}
                <article className="register-card">
                    {/* Card-Left Başlangıç */}
                    <LoginImage />
                    {/* Card-Left Bitiş */}
                    <div className="register-row">
                        {/* Card-Right Başlangıç */}
                        <article className="register-card-right">
                            <div className="user-register">
                                <h1>REGISTER</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <form className="input-group-register">
                                <Input
                                    className="ınputRegister"
                                    name="emailAddress"
                                    value={values.emailAddress}
                                    onChange={handleInput}
                                    type="email"
                                    placeholder="Enter your E-mail"
                                    prefix={<AiOutlineMail className="site-form-item-icon" />}
                                />
                                <br />
                                <Input
                                    name="username"
                                    className="ınputRegister"
                                    value={values.username}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Username"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                />
                                <br />
                                <Input.Password
                                    className="ınputRegisterPassword"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInput}
                                    type="password"
                                    placeholder="Enter your Password"
                                    prefix={<RiLockPasswordLine style={{ marginLeft: "13px" }} />}
                                    style={{
                                        marginBottom: "20px"
                                    }}
                                />
                                <Input
                                    className="ınputRegister"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Name"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                />
                                <br />
                                <Input
                                    className="ınputRegister"
                                    name="surname"
                                    value={values.surname}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Last Name"
                                    prefix={<AiOutlineUser />}
                                />
                                <br />
                                <Input
                                    className="ınputRegister"
                                    name="phoneNumber"
                                    value={maskPhoneNumber(values.phoneNumber)}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="0 (000) 000-00-00"
                                    prefix={<AiOutlinePhone className="site-form-item-icon" />}
                                />
                                <Link to="/" className="acconut-register">
                                    Do you already have an account?
                                </Link>
                            </form>
                            {error && <ErrorMessage message={error} />}
                            <AuthButton text="REGISTER" onClick={handleSubmit}/>
                        </article>
                        {/* Card-Right Bitiş */}
                    </div>
                </article>
                {/* Article Bitiş */}
            </section>
        </section>
    );
}