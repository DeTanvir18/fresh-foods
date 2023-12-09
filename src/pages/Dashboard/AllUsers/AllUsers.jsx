import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    // const handleMakeInstructor = user => {
    //     // this code is to [make-instructor] after [confirmation]
    //     Swal.fire({
    //         title: `Are you sure to make "${user.name}" an Instructor?`,
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Make it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.patch(`/users/instructor/${user._id}`)
    //                 .then(res => {
    //                     // console.log(res.data)
    //                     if (res.data.modifiedCount > 0) {
    //                         refetch();
    //                         Swal.fire({
    //                             position: "center",
    //                             icon: "success",
    //                             title: `${user.name} is an Instructor Now!`,
    //                             showConfirmButton: false,
    //                             timer: 1500
    //                         });
    //                     }
    //                 })
    //         }
    //     })
    // }

    const handleMakeAdmin = user => {
        // this code is to [make-admin] after [confirmation]
        Swal.fire({
            title: `Are you sure to make "${user.name}" an admin?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${user.name} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="w-full">
            {/* <SectionTitle heading="Know Your Users"></SectionTitle> */}
            <div className="bg-white w-auto md:w-full rounded-lg ms-2">
                <Helmet>
                    <title>Admin | All Users</title>
                </Helmet>
                <SectionTitle heading={"All Users"}></SectionTitle>
                <div className="uppercase font-semibold h-20 ">
                    <h3 className="text-2xl text-start align-middle ms-4 mt-4">Total Users: {users.length}</h3>
                </div>
                <div className="overflow-x-auto border-4">
                    <table className="table border-4">
                        {/* head */}
                        <thead className="font-bold text-black bg-sky-300 rounded-lg border-4">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Badge</th>
                                <th>Make</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* table rows */}
                            {
                                users.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.badge === 'Gold' ?
                                                <span className="flex items-center font-semibold text-md text-amber-700 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Gold</span> :
                                                user.badge === 'Silver' ?
                                                    <span className="flex items-center font-semibold text-md text-zinc-400 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Silver</span> :
                                                    user.badge === 'Platinum' ?
                                                        <span className="flex items-center font-semibold text-md text-red-600 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Platinum</span>
                                                        :
                                                        <span className="flex items-center font-semibold text-md text-slate-500 px-2 py-1 rounded-md"><BiBadgeCheck></BiBadgeCheck> Bronze</span>


                                        }
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin' ? <span className="font-semibold text-md text-white bg-sky-500 px-2 py-1 rounded-md">Admin</span> :
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-xl text-white bg-[#D1A054] px-2" ><FaUsers></FaUsers></button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost text-xl text-white bg-red-500 px-2" ><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;