import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../pages/Home/MealsByCategory/MealDetails/MealDetails";
import AllMeals from "../pages/Home/MealsByCategory/AllMeals/AllMeals";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddMeal from "../pages/Dashboard/AddMeal/AddMeal";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import AdminAllMeals from "../pages/Dashboard/AdminAllMeals/AdminAllMeals";
import AdminAllReviews from "../pages/Dashboard/AdminAllReviews/AdminAllReviews";
import ServeMeals from "../pages/Dashboard/ServeMeals/ServeMeals";
import AdminUpcomingMeals from "../pages/Dashboard/AdminUpcomingMeals/AdminUpcomingMeals";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import UpdateMeal from "../pages/Dashboard/UpdateMeal/UpdateMeal";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allmeals',
                element: <AllMeals></AllMeals>
            },
            {
                path: '/meal/:id',
                element: <MealDetails></MealDetails>,
                loader: ({ params }) => fetch(`https://a-12-fresh-foods-server.vercel.app/mealdetails/${params.id}`)
            },
            {
                path: 'upcomingMeals',
                element: <UpcomingMeals></UpcomingMeals>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/dashboard/myRequestedMeals',
                element: <MyCart></MyCart>
            },
            {
                path: '/dashboard/myReviews',
                element: <MyReviews></MyReviews>
            },


            // admin route
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addmeals',
                element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
            },
            {
                path: 'adminAllMeals',
                element: <AdminRoute><AdminAllMeals></AdminAllMeals></AdminRoute>
            },
            {
                path: 'updateMeal/:id',
                element: <AdminRoute><UpdateMeal></UpdateMeal></AdminRoute>,
                loader: ({ params }) => fetch(`https://a-12-fresh-foods-server.vercel.app/mealdetails/${params.id}`)
            },
            {
                path: 'adminAllReviews',
                element: <AdminRoute><AdminAllReviews></AdminAllReviews></AdminRoute>
            },
            {
                path: 'serveMeals',
                element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
            },
            {
                path: 'adminUpcomingMeals',
                element: <AdminRoute><AdminUpcomingMeals></AdminUpcomingMeals></AdminRoute>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
]);