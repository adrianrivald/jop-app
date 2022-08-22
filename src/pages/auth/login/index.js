import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import FlatButton from "../../../components/button/flat";
import Cookies from 'universal-cookie';

const url = process.env.REACT_APP_API_URL;

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        console.log('username', username)
        console.log('password', password)
        await axios.post(`${url}login`, {
            "username": username,
            "password": password
        }).then(result => {
            console.log('res', result)
            const token = result.data.data.token
            const userData = result.data.data.user
            cookies.set('token', token, { path: '/' });
            localStorage.setItem('userData', JSON.stringify({
                level: userData.level,
                name: userData.nama,
                code: userData.code
            }));
            navigate('/homepage');
        })
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900">LOGIN</h1>
            <div className="flex flex-col items-center p-12 w-full">
                <input className="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
                <input className="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="password" placeholder="Kata Sandi" onChange={(e) => {setPassword(e.target.value)}}/>
                <FlatButton className={'w-full'} text={'Masuk'} onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default Login