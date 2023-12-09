import useCart from '../hooks/useCart';
import { NavLink, Outlet } from 'react-router-dom';
import {  FaList, FaEnvelope, FaCirclePlus, FaBowlFood, FaUsers, FaBowlRice } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Helmet } from 'react-helmet-async';
import { FaHome } from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';
import { FcReading, FcAbout, FcNeutralTrading, FcPlus } from "react-icons/fc";
import { BiSolidUser } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const [refetch, cart ] = useCart();
    const [isAdmin] = useAdmin();
    const {user } = useAuth();
    const myMeals = cart.filter(meal => meal.email === user.email);


    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="flex">
                <div className="w-64 min-h-screen bg-sky-400">
                    <ul className="menu">
                        {
                            isAdmin
                                ?
                                <>
                                    <li>
                                        <NavLink to="/dashboard/adminProfile">
                                            <BiSolidUser></BiSolidUser>
                                            Admin Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/users">
                                            <FaUsers></FaUsers>
                                            Manage Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addmeals">
                                            <FcPlus></FcPlus>
                                            Add A Meal</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/adminAllMeals">
                                            <FaList></FaList>
                                            All Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/adminAllReviews">
                                            <FcAbout></FcAbout>
                                            All Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/serveMeals">
                                            <FaBowlRice></FaBowlRice>
                                            Serve Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/adminUpcomingMeals">
                                            <FcNeutralTrading></FcNeutralTrading>
                                            Upcoming Meals</NavLink>
                                    </li>
                                    {/* shared nav links */}
                                    <div className="divider"></div>
                                    <div className="divider mt-1"></div>
                                    <li>
                                        <NavLink to="/">
                                            <FaHome></FaHome>
                                            Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/allmeals">
                                            <FaBowlFood></FaBowlFood>
                                            Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            <FaEnvelope></FaEnvelope>
                                            Contact</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to="/dashboard/userHome">
                                            <FaHome></FaHome>
                                            User Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/userProfile">
                                            <FcReading></FcReading>
                                            My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myRequestedMeals">
                                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                                            Requested Meals ({myMeals?.length}) </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myReviews">
                                            <FaCirclePlus></FaCirclePlus>
                                            My Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/paymentHistory">
                                            <FaList></FaList>
                                            Real Payment History</NavLink>
                                    </li>
                                    {/* shared nav links */}
                                    <div className="divider"></div>
                                    <div className="divider mt-1"></div>
                                    <li>
                                        <NavLink to="/">
                                            <FaHome></FaHome>
                                            Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/allmeals">
                                            <FaBowlFood></FaBowlFood>
                                            Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            <FaEnvelope></FaEnvelope>
                                            Contact</NavLink>
                                    </li>
                                </>

                        }
                    </ul>

                </div>
                <div className="flex-1 p-8">
                    <div className="w-4/12 mx-auto mb-3 md:my-16 text-center">
                        <h3 className="md:text-5xl text-pink-500 font-bold md:border-y-4 border-sky-500 py-6">Dashboard</h3>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;