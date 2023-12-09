import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyCart = () => {
    const {user } = useAuth();
    const [refetch, cart] = useCart();
    const myMeals = cart.filter(meal => meal?.email === user?.email);
    const totalPrice = myMeals.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();


    // function to delete items from cart
    const handleDelete = id => {
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

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // refetch to update cart data count immediately
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
        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-3xl text-sky-700">Items: {myMeals.length}</h2>
                <h2 className="text-3xl text-sky-700">Total Price: {totalPrice}</h2>
                </div>

            {/* dashboard table */}
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myMeals.map((meal, index) => <tr key={meal._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={meal.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-sky-600">
                                    {meal.title}
                                </td>
                                <td className="font-bold text-amber-600">${meal.price}</td>
                                <td className="font-bold text-amber-600">{meal.likeCount}</td>
                                <td className="font-bold text-amber-600">{meal.reviewCount}</td>
                                <td>
                                    {meal.status === "Pending" ?
                                        <>
                                            <td className="font-bold text-red-600 p-0">{meal.status}</td>
                                        </>
                                        :
                                        <>
                                            <td className="font-bold text-green-600 p-0">{meal.status}</td>
                                        </>
                                    }
                                </td>
                                <th>
                                    {meal.status === "Delivered" ?
                                        <>
                                            <button
                                                className="btn btn-ghost btn-lg">
                                                <FaTrashAlt className="text-slate-200"></FaTrashAlt>
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button
                                                onClick={() => handleDelete(meal._id)}
                                                className="btn btn-ghost btn-lg">
                                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        </>
                                    }

                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;