import { createBrowserRouter, redirect } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import MainLayout2 from "../Layout/MainLayout2";
import Login from "../pages/Login";
import HomePage from '../pages/Homepage';
import DetailEvent from '../pages/DetailEvent';
import HomePage2 from '../pages/Homepage2';
import DetailEvent2 from '../pages/DetailEvent2';
import Category from '../pages/Category';
import UpdateCategory from '../pages/UpdateCategory';
import AddNewCategory from '../pages/AddNewCategory';
import UpdateEvent from '../pages/UpdateEvent';
import AddNewEvent from '../pages/AddNewEvent';
import NewUser from '../pages/NewUser';


const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            if (access_token) {
                throw redirect("/homepage");
            }
            return null;
        },
    },
    {
        path: "/",
        element: <MainLayout2 />,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "/pub/detailevent/:id",
                element: <DetailEvent/>
            }
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/homepage",
                element: <HomePage2 />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/detailevent/:id",
                element: <DetailEvent2 />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/categories",
                element: <Category />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/updatecategory",
                element: <UpdateCategory />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/addcategory",
                element: <AddNewCategory />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/updateevent",
                element: <UpdateEvent />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/addevent",
                element: <AddNewEvent />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            },
            {
                path: "/new-user",
                element: <NewUser />,
                loader: () => {
                    const access_token = localStorage.getItem("access_token");
                    if (access_token) {
                        return null;
                    }
                    throw redirect("/login");
                },
            }
        ]
    }

])

export default router