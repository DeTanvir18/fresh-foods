import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FcAnswers, FcApproval, FcExport } from "react-icons/fc";
import useAdminCart from "../../../hooks/useAdminCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ServeMeals = () => {
    const [cart, refetch] = useAdminCart();
    // console.log(cart);
    const axiosSecure = useAxiosSecure();


    const handleDeliveredMeal = (meal) => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: `${meal.title} has alreary been delivered!`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const handleServeMeal = (meal) => {
        Swal.fire({
            title: `Are you sure to deliver ${meal.title}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/carts/${meal._id}`)
                    .then(res => {
                        // // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${meal.title} has been delivered!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })

    }


    return (
        <div>
            <Helmet>
                <title>Admin | Serve Meals</title>
            </Helmet>
            <div className="w-full">
                <div className="bg-white w-auto md:w-full rounded-lg ms-2">
                    <SectionTitle heading="Serve Pending Meals"></SectionTitle>
                    <div className="overflow-x-auto">
                        <table className="table border-4">
                            {/* head */}
                            <thead className="font-bold text-black border-b-4 bg-sky-300">
                                <tr>
                                    <th>#</th>
                                    <th>Meal</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Req by</th>
                                    <th>Email</th>
                                    <th>Serve</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* table rows */}
                                {
                                    cart.map((meal, index) => <tr
                                        key={meal._id}
                                    >
                                        <td className="font-extrabold text-xl">{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-20 h-auto">
                                                    <img src={meal.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{meal.title}</td>
                                        <td className="text-start">${meal.price}</td>
                                        <td className={meal.status === 'Pending' ? "font-bold text-red-500" : "text-green-500 font-bold"}>{meal.status}</td>
                                        <td>{meal.name}</td>
                                        <td className="text-start">{meal.email}</td>
                                        <td>
                                            {meal.status === 'Delivered' ?
                                                <button onClick={() => handleDeliveredMeal(meal)} className="btn btn-ghost text-3xl text-green-500 px-2" ><FcApproval></FcApproval></button>
                                                :
                                                <button onClick={() => handleServeMeal(meal)} className="btn btn-ghost text-3xl text-red-500 px-2" ><FcExport></FcExport></button>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/meal/${meal.menuId}`}>
                                                <button className="btn btn-ghost text-3xl text--sky-500 px-2" ><FcAnswers></FcAnswers></button>
                                            </Link>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServeMeals;