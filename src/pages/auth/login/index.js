import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FlatButton from "../../../components/button/flat";
import Cookies from 'universal-cookie';
import useValidationForm from "./useValidationForm";

const url = process.env.REACT_APP_API_URL;

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState({});

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const showPasswordIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleShowPassword}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg> 
    )

    const hidePasswordIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleShowPassword}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    )

    const handleSubmit = async() => {
        const form = {
            "username": username,
            "kataSandi": password
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [valid, errorMessage] = useValidationForm(form)

        setErrorMessage({ ...errorMessage })

        if (valid) {
          return await axios.post(`${url}login`, {
              "username": username,
              "password": password
          }).then((response) => {
              const token = response.data.data.token
              const userData = response.data.data.user
              cookies.set('token', token, { path: '/' });
              localStorage.setItem('userData', JSON.stringify({
                  level: userData.level,
                  name: userData.nama,
                  code: userData.code,
                  id: userData.id
              }));
              navigate('/homepage');
          }).catch((error) => {
            if(error.response.status === 422) {
                setErrorMessage({ ...errorMessage, submit: error.response.data.message })
            } else if(error.response.status === 401) {
                setErrorMessage({ ...errorMessage, submit: 'Login gagal' })
            }
          })
        }
    }

    return (
        <div className="relative h-screen flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900">LOGIN</h1>
            <div className="flex flex-col items-center p-12 w-full">
                {/* username */}
                <input className="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                <div className="text-red text-xs text-left w-full mb-3">{errorMessage.username}</div>
                {/* password */}
                <label className="relative block flex justify-between w-full bg-white rounded-lg p-3">
                    <input className="text-xs leading-tight w-full mr-2 focus:outline-none focus:shadow-outline" type={showPassword ? 'password' : 'text'} placeholder="Kata Sandi" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    {/* icons */}
                    {showPassword ? hidePasswordIcon : showPasswordIcon}
                </label>
                <div className="text-red text-xs text-left w-full mb-3">{errorMessage.kataSandi}</div>
                <div className="text-red text-xs text-center w-full mb-3">{errorMessage.submit}</div>
                <FlatButton className={'w-full'} text={'Masuk'} onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default Login