import {Navigate, createBrowserRouter} from "react-router-dom"
import Login from "./views/Login";
import Singup from "./views/Singup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/user/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/user/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Singup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;