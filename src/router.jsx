import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/GuestLayout.jsx";
import Listtodo from "./views/Listtodo.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Listtodos from "./components/Listtodos.jsx";
import Login from "./views/Login.jsx";
import WelcomePage from "./views/welcomepage.jsx";
import Singup from "./views/Singup.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <WelcomePage />
            },

        ]
    },
    {
        path: '/',
        element: <Listtodos />,
        children: [
            {
                path: '/Listtodos',
                element: <Listtodo />
            },

        ]
    },

    {
        path: '/',
        element: <GuestLayout />,

        children: [
            {
                path: '/Login',
                element: <Login />
            },
            {
                path: '/Singup',
                element: <Singup />
            },
        ]
    }
])

export default router;