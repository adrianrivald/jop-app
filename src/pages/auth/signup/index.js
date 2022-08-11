import React from "react";
import { useNavigate } from 'react-router-dom';
import FlatButton from "../../../components/button/flat";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900">SIGNUP</h1>
            <form onSubmit={() => navigate('/auth/login')} class="flex flex-col items-center p-12 w-full">
                <input class="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="email" placeholder="email" />
                <input class="w-full rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline mb-3" type="email" placeholder="kata sandi" />
                <FlatButton className={'w-full'} text={'DAFTAR'}/>
            </form>
        </div>
    )
}

export default Signup