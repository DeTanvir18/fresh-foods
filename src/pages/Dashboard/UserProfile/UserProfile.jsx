import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useDbUsers from "../../../hooks/useDbUsers";
import { BiBadgeCheck } from "react-icons/bi";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const UserProfile = () => {
    const {user} = useAuth();
    const [refetch, users] = useDbUsers();
    
    return (
        <div>
            <Helmet>
                <title>Dashboard | My Profile</title>
            </Helmet>
            <SectionTitle heading={`${user.displayName}'s Profle`}></SectionTitle>
            {
                users.map(person => <div key={person._id} className="flex flex-col h-full lg:flex-row justify-center lg:justify-start items-center gap-2 mx-auto max-w-md">
                    <div>
                        <figure><img className="w-40 rounded-t-md  lg:rounded-tl-lg me-16" src={user?.photoURL} alt="admin-img" /></figure>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center mx-0 lg:mx-2 mt-5 space-y-3 p-2 md:p-4">
                        <div className="text-orange-800">
                            <div className="space-y-1">
                                <h3><span className="font-bold text-sky-500">Name:</span>{user?.displayName}</h3>
                            </div>
                            <div className="space-y-1">
                                <h3><span className="font-bold text-sky-500">Email: </span>{user?.email}</h3>
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

export default UserProfile;