import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useReviews from "../../../hooks/useReviews";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminAllReviews = () => {
    const [reviews, refetch] = useReviews();
    const axiosSecure = useAxiosSecure();

    const handleDeleteReview = (review) => {
        Swal.fire({
            title: `Are you sure to delete ${review.mealTitle} review?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${review._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    axiosSecure.post(`/meals/reviews/decrease/${review.menuId}`)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch();
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: `Review has been deleted.`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }


            }
        });
    }

    return (
        <div className="w-full">
            <SectionTitle heading="All the Reviews"></SectionTitle>
            <div className="bg-white w-auto md:w-full rounded-lg ms-2">
                <Helmet>
                    <title>Admin | All Reviews</title>
                </Helmet>
                <div className="overflow-x-auto">
                    <table className="table border-4">
                        {/* head */}
                        <thead className="font-bold text-black border-b-4 bg-sky-300">
                            <tr>
                                <th>#</th>
                                <th>Img</th>
                                <th>Meal</th>
                                <th>Likes</th>
                                <th>Reviews</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Delete</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* table rows */}
                            {
                                reviews.map((review, index) => <tr
                                    key={review._id}
                                >
                                    <td className="font-extrabold text-xl">{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-auto">
                                                <img src={review.userImg} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{review.mealTitle}</td>
                                    <td className="font-semibold">{review.likeCount}</td>
                                    <td className="font-semibold">{review.reviewCount}</td>
                                    <td className="font-semibold">{review.userName}</td>
                                    <td className="font-semibold">{review.userEmail}</td>
                                    <td>
                                        <button onClick={() => handleDeleteReview(review)} className="btn btn-ghost text-2xl text-white bg-red-500 px-2" ><FaDeleteLeft></FaDeleteLeft></button>
                                    </td>
                                    <td>
                                        <Link to={`/meal/${review.menuId}`}>
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

export default AdminAllReviews;