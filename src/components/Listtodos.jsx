import { Fragment, useEffect } from 'react'
import axiosClient from '../axios.js'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { userStateContext } from '../context/ContextProvider.jsx';



const todosNavigation = [
    { name: 'My to do', to: '/Listtodos' },
]
const userNavigation = [
    { name: 'Sign out', to: '/' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } = userStateContext();

    if (!userToken) {
        return <Navigate to='login' ></Navigate>
    }
    const logout = async (ev) => {
        ev.preventDefault();
        try {
            await axiosClient.delete('/logout');
            setCurrentUser({});
            setUserToken(null);
            // Afficher un message de succès
            console.log('Déconnexion réussie');
        } catch (error) {
            // Afficher un message d'erreur
            console.error('Erreur lors de la déconnexion', error);
        }
    };

    useEffect(() => {
        axiosClient.get('/GetAuthUser')
            .then(({ data }) => {
                if (data) {
                    setCurrentUser(data)

                } else {
                    localStorage.removeItem('TOKEN');
                    window.location.reload();

                }
            })
    }, [])
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-orange-600">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-30 w-30"
                                                src="/Logo.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="hidden md:block">

                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {todosNavigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.to}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-orange-900 text-white'
                                                                : 'text-white hover:bg-orange-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">

                                        <div className="ml-4 flex items-center md:ml-6">

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        <UserIcon className="w-8 h-8 bg-orange-200 p-2 rounded-full text-black" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="text-base p-2 font-medium leading-none text-">{currentUser.name}</div>
                                                        <div className="text-sm  p-2 font-medium leading-none text-gray-400">{currentUser.email}</div>
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                <a
                                                                    href="#"
                                                                    onClick={(ev) => logout(ev)}
                                                                    className={'block px-4 py-2 roun text-sm text-gray-700 hover:bg-orange-200 rounded-full'}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-orange-200 p-2 text-black-400 hover:bg-orange-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {todosNavigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className={({ isActive }) => classNames(
                                                isActive ? 'bg-white text-black' : 'text-white hover:bg-orange-200 hover:text-black',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-orange-200 pt-4 pb-3">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-black">{currentUser.name}</div>
                                            <div className="text-sm font-medium leading-none text-white">{currentUser.email}</div>
                                        </div>

                                    </div>
                                    <div className="mt-3 space-y-1 px-2">

                                        <Disclosure.Button
                                            as="a"
                                            herf='#'
                                            onClick={(ev) => logout(ev)}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-orange-200 hover:text-black"
                                        >
                                            Sing out
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-6 py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">TO-DO-LIFE</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}
