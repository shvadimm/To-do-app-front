import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../axios.js';
import { userStateContext } from '../context/ContextProvider.jsx';

export default function Login() {
    const { setCurrentUser, setUserToken } = userStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosClient.post('user/login', {
                email,
                password,
            });

            setEmail('');
            setPassword('');

            setCurrentUser(response.data.user);
            setUserToken(response.data.token);

        } catch (error) {

            // Display API error message using toast
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Une erreur s\'est produite lors de la connexion.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <>
            <h2 className="mt-6 text-center text-3xl 4vw font-bold tracking-tight text-gray-900">
                Connectez-vous à votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <Link
                    to="/singup"
                    className="font-medium text-yellow-500 hover:text-yellow-600 transition-all duration-500"
                >
                    créez le !
                </Link>
            </p>
            <form onSubmit={handleLogin} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label>
                            Adresse e-mail
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Adresse e-mail"
                        />
                    </div>
                    <div>
                        <label>
                            Mot de passe

                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Mot de passe"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-yellow-400 py-2 px-3 text-sm font-semibold text-black hover:bg-yellow-500 transition-all duration-1000 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-black group-hover:text-black" aria-hidden="true" />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>

            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}
