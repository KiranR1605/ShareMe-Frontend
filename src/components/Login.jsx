import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        const doc = {
                            _id: res.data.id,
                            _type: 'user',
                            userName: res.data.name,
                            image: res.data.picture,
                        }
                        client.createIfNotExists(doc).then(() => {
                            navigate('/', { replace: true });
                        }).catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))
            }
        },
        [user]
    )

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className=" relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
                <div className="p-5">
                    <img src={logo} width="130px" alt='Logo' />
                </div>

                <div className="shadow-2xl">
                    <button
                        type="button"
                        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                        onClick={() => login()}
                    >
                        <FcGoogle className="mr-4" /> Sign in with google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login