import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMeals from "../../../hooks/useMeals";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BiDetail, BiPlusCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminUpcomingMeals = () => {
    const [meals, refetch] = useMeals();
    // filter the approved meals
    const upcomingMeals = meals.filter(meal => meal.status === 'upcoming');
    // for delete operation
    const axiosSecure = useAxiosSecure();

    const handlePublishMeal = (meal) => {
        Swal.fire({
            title: `Are you sure to publish ${meal.title}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/meals/${meal._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${meal.title} has been published!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    };
    const handleDeleteUpcoming = (meal) => {
        Swal.fire({
            title: `Are you sure to delete ${meal.title} from upcoming?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/meals/${meal._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${meal.title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div className="w-full">
            <SectionTitle heading="All the Upcomings"></SectionTitle>
            <div className="bg-white w-auto md:w-full rounded-lg ms-2">
                <Helmet>
                    <title>Admin | Upcoming Meals</title>
                </Helmet>
                <div className="overflow-x-auto">
                    <table className="table border-4">
                        {/* head */}
                        <thead className="font-bold text-black border-b-4 bg-sky-300">
                            <tr>
                                <th>#</th>
                                <th>Meal</th>
                                <th>Title</th>
                                <th>Likes</th>
                                <th>Reviews</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Distributor</th>
                                <th>Email</th>
                                <th>Publish</th>
                                <th>Delete</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* table rows */}
                            {
                                upcomingMeals.map((meal, index) => <tr
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
                                    <td>{meal.likeCount}</td>
                                    <td>{meal.reviewCount}</td>
                                    <td className="text-start">${meal.price}</td>
                                    <td className={meal.status === 'Pending' ? "font-bold text-red-500" : "text-green-500 font-bold"}>{meal.status}</td>
                                    <td className="text-start">{meal.distributor}</td>
                                    <td className="text-start">{meal.email}</td>
                                    <td>
                                        { 
                                        meal.likeCount >= 10 ?
                                        <button onClick={() => handlePublishMeal(meal)} className="btn btn-ghost text-2xl text-white bg-green-500 px-2" ><BiPlusCircle></BiPlusCircle></button>
                                        :
                                        <button onClick={() => handlePublishMeal(meal)} className="btn btn-ghost text-xs text-white bg-red-500 px-2" >Likes Needed</button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUpcoming(meal)} className="btn btn-ghost text-2xl text-white bg-red-500 px-2" ><FaDeleteLeft></FaDeleteLeft></button>
                                    </td>
                                    <td>
                                        <Link to={`/meal/${meal._id}`}>
                                            <button className="btn btn-ghost text-2xl text-white bg-sky-500 px-2" ><BiDetail></BiDetail></button>
                                        </Link>
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

export default AdminUpcomingMeals;