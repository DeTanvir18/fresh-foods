import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { BiBadgeCheck } from "react-icons/bi";
import useDbUsers from "../../../hooks/useDbUsers";
import useMeals from "../../../hooks/useMeals";


const AdminProfile = () => {
    const { user } = useAuth();
    const [refetch, users] = useDbUsers();
    const [meals, ] = useMeals();
    // filter the approved meals
    const adminMeals = meals.filter(meal => meal.email === user?.email);

    return (
        <div>
            <Helmet>
                <title>Admin | Profile</title>
            </Helmet>
            {
                users.map(person => <div key={person._id} className="flex flex-col h-full lg:flex-row justify-center lg:justify-start items-center gap-2 mx-auto max-w-md">
                    <div>
                        <figure><img className="w-40 rounded-t-md  lg:rounded-tl-lg me-16" src={user?.photoURL} alt="admin-img" /></figure>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center mx-0 lg:mx-2 mt-5 space-y-3 p-2 md:p-4">
                        <div className="">
                            <div className="space-y-1">
                                <h3><span className="font-bold text-amber-700"></span>{user?.displayName}</h3>
                            </div>
                            <div className="space-y-1">
                                <h3><span className="font-bold text-amber-700"></span>{user?.email}</h3>
                            </div>
                            <div className="space-y-1">
                                <h3><span className="font-bold text-sky-500">Added Meals: </span>{adminMeals.length}</h3>
                            </div>
                            <div className="space-y-1">
                                {
                                    person.badge === 'Gold' ?
                                        <span className="flex items-center font-semibold text-md text-amber-700 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Gold</span> :
                                        person.badge === 'Silver' ?
                                            <span className="flex items-center font-semibold text-md text-zinc-400 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Silver</span> :
                                            person.badge === 'Platinum' ?
                                                <span className="flex items-center font-semibold text-md text-red-600 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Platinum</span>
                                                :
                                                <span className="flex items-center font-semibold text-md text-slate-500 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Bronze</span>


                                }
                            </div>
                        </div>
                    </div>

                </div>)
            }


        </div>
    );
};

export default AdminProfile;