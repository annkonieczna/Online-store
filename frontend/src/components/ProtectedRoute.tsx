import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const token = sessionStorage.getItem("authtoken");

    if (!token) {
        return <Navigate to={"/SignIn"} replace></Navigate>
    }
    return <Outlet/>

}