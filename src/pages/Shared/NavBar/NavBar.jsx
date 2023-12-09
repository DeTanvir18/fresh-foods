import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useCart from "../../../hooks/useCart";
import { FaCartPlus } from "react-icons/fa6";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    // for user pic dropdown
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    // for cart data
    const [refetch, cart] = useCart();
    const myMeals = cart.filter(meal => meal?.email === user?.email);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    'Successfully Logged Out!',
                    'successful'
                )
                navigate('/')
            })
            .then()
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allmeals">Meals</NavLink></li>
        <li><NavLink to='/upcomingmeals'>Upcomings</NavLink></li>
        {
            user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        }
        {user && <li>
            {/* this li is linked to dashboard-mycart */}
            <Link to="/dashboard/myRequestedMeals">
                <div className="flex items-center justify-between px-2 py-1 bg-sky-500 rounded-lg text-white">
                    <FaCartPlus></FaCartPlus>
                    <p className="badge badge-info max-w-[16px] text-amber-800 bg-transparent ms-1">+{myMeals?.length || 0}</p>
                </div>
            </Link>
        </li>}
        {!user && <li><NavLink to="/login">Join Us</NavLink></li>}
    </>

    return (
        <div>
            <div >
                <nav className="navbar max-w-[1320px]  mx-auto mt-0 lg:mt-3 mb-36 lg:mb-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden bg-white me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content text-sky-500 font-medium mt-3 z-[1] space-y-1 p-2 rounded-box w-28">
                                {navLinks}
                            </ul>
                        </div>
                        <div>
                            <Link to='/'><img src="https://i.ibb.co/KbJCxFG/logofresh-1.png" alt="" /></Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden md:flex">
                        <div className="hidden lg:flex lg:flex-col justify-center items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 2 }}
                                transition={{ duration: 3 }}
                            >
                                <ul className="flex items-center gap-4 font-medium px-2 text-amber-800 border rounded shadow-md ">
                                    {navLinks}
                                </ul>
                            </motion.div>
                            {/* <form className="ps-2 md:ps-0">
                                <input className="border p-4 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                <input className="bg-[#2a6bab] text-white font-semibold px-6 py-[17px] rounded-r-lg" type="submit" value="Search" />
                            </form> */}
                        </div>
                    </div>
                    <div className="navbar-end">
                        {
                            user ?
                                <>
                                    <div>
                                        <div className="flex flex-col justify-center items-center text-[9px] md:text-[12px]">
                                            <div data-tooltip-placement="left" className="tooltip tooltip-left lg:tooltip-top">
                                                {
                                                    user.photoURL ?
                                                        <>
                                                            <img src={user?.photoURL} alt="user" onClick={toggleDropdown} className="rounded-full w-10  h-12 md:w-12" />
                                                            {isDropdownOpen && (
                                                                <div className="absolute z-10 right-0 mt-2 bg-white border rounded shadow-md font-bold">
                                                                    <div className="px-1 py-2">
                                                                        <p className="text-sky-500">{user?.displayName}</p>
                                                                    </div>
                                                                    <Link to='/dashboard'>
                                                                        <button className="text-sky-700 px-2 py-1 hover:bg-gray-200 focus:outline-none" >
                                                                            Dashboard
                                                                        </button>
                                                                    </Link>
                                                                    <button className="text-sky-700 px-2 py-1 hover:bg-gray-200 focus:outline-none" onClick={handleSignOut}>
                                                                        Log Out
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </>
                                                        :
                                                        <img src="https://i.postimg.cc/tgVxRSf8/u.jpg" alt="user" className="rounded-full w-10 md:w-12 block" />
                                                }
                                            </div>
                                            {/* <div className="text-white">
                                                    <button onClick={handleSignOut} className="btn btn-xs text-[10px] lg:text-[13px] bg-black rounded-md text-sky-500">Log Out</button>
                                                </div> */}
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="flex flex-col justify-center items-center">
                                        <img src="https://i.postimg.cc/tgVxRSf8/u.jpg" alt="user" className="rounded w-10 md:w-12 block" />
                                        <button className="text-[10px] lg:text-[13px] rounded-md p-1 text-sky-500"><Link to="/login">Join Us</Link></button>
                                    </div>
                                </>
                        }
                    </div>
                </nav>
                {/* <nav className="max-w-[1320px] mx-auto mb-20 lg:mb-0 p-2">
                        <div className="hidden lg:flex lg:flex-col justify-center items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 2 }}
                                transition={{ duration: 3 }}
                            >
                                <ul className="flex gap-4 font-medium p-4 text-white bg-[#3977b6] border rounded shadow-xl ">
                                    {navLinks}
                                </ul>
                            </motion.div>
                            <form className="ps-2 md:ps-0">
                                <input className="border p-4 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                <input className="bg-[#2a6bab] text-white font-semibold px-6 py-[17px] rounded-r-lg" type="submit" value="Search" />
                            </form>
                        </div>
                    </nav> */}
            </div>
        </div>
    );
};

export default Navbar;

