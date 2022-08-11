import React from "react";
import { useNavigate } from 'react-router-dom';
import FlatButton from "../../../components/button/flat";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900">LOGIN</h1>
            <div className="mt-2 text-center text-gray-600">Don't have an account yet? <a href="/auth/signup" className="font-medium text-flora hover:text-flora">Signup</a></div>
            <form onSubmit={() => navigate('/homepage')} class="flex flex-col items-center p-12 w-full">
                <input class="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="email" placeholder="email" />
                <input class="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="email" placeholder="kata sandi" />
                <a href="/auth/forget" class="mb-4 underline">Lupa kata sandi ?</a>
                <FlatButton className={'w-full'} text={'Masuk'}/>
            </form>
        </div>
    )
}

export default Login