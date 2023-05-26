
import { Link } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
export default function Singup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState({ __html: '' });

    const onSubmit = (ev) => {
        ev.preventDefault()
        setError({ __html: '' })

        axiosClient.post('/singup', {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(({ response }) => {
                console.log(response);
            })
    }
    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Créer votre compt gratuitement
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Vous avez de compte ?{' '}

                <Link
                    to="/login"
                    className="font-medium text-yellow-500 hover:text-yellow-600 transition-all duration-500"
                >
                    connectez vous
                </Link>
            </p>
            <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="Full-name" className="sr-only">
                            Full name

                        </label>
                        <input
                            id="Full-name"
                            name="name"
                            type="text"
                            required
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Adresse e-mail
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-confiration" className="sr-only">
                            Password confiration
                        </label>
                        <input
                            id="password-confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-yellow-200 sm:text-sm sm:leading-6"
                            placeholder="Password Confirmation"
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
                        Signup
                    </button>
                </div>
            </form>
        </>
    )
}


