
import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../context/ContextProvider";
export default function GuestLayout() {

    const { userToken } = userStateContext();


    if (userToken) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <img
                            className="mx-auto h-100 w-100"
                            src="/Logo.gif"
                            alt=""
                        />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
