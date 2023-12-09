import { BiDetail } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useReviews from "../../../hooks/useReviews";
import useAuth from "../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Modal from 'react-modal';






const MyReviews = () => {
    const { user } = useAuth();
    const [reviews, refetch] = useReviews();
    const myReviews = reviews.filter(review => review.userEmail === user?.email);
    const axiosSecure = useAxiosSecure();

    // react-modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };





    const handleUpdateReview = (e) => {
        const form = e.target;
        const reviewId = form.reviewId.value;
        const review = form.review.value;

        const updatedReview = {
            review,
        }

        axiosSecure.put(`/reviews/update/${reviewId}`, updatedReview)
            .then(res => {
                // console.log(res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Review Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
        e.target.reset();

    }

    const handleDeleteReview = (review) => {
        Swal.fire({
            title: `Are you sure to delete ${review.menuTitle} review?`,
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
                                    showConfirmButton: true,
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
                    <title>Admin | My Reviews</title>
                </Helmet>


                {/* <div className="max-w-sm mx-auto">
                    <button onClick={openModal}>Open Modal</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="max-w-sm mx-auto mt-20"
                    >



                        <h2>Hello, Im a modal!</h2>
                        <button onClick={closeModal}>Close Modal</button>
                    </Modal>
                </div> */}


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
                                <th>Update</th>
                                <th>Delete</th>
                                <th></th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* table rows */}
                            {
                                myReviews.map((review, index) => <tr
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
                                    <td>{review.likeCount}</td>
                                    <td>{review.reviewCount}</td>
                                    <td>
                                        {/* <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-ghost text-2xl text-white bg-sky-500 px-2" ><FaEdit></FaEdit></button> */}
                                        <button onClick={openModal} className="btn btn-ghost text-2xl text-white bg-sky-500 px-2" ><FaEdit></FaEdit></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteReview(review)} className="btn btn-ghost text-2xl text-white bg-red-500 px-2" ><FaDeleteLeft></FaDeleteLeft></button>
                                    </td>
                                    {/* //* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box">
                                            {/* <span className="font-bold text-amber-800 my-8 text-lg">Update Your Review Here.</span>
                                            <form onSubmit={(e) => { handleUpdateReview(e); document.getElementById('my_modal_2').close(); }}>
                                                <div>
                                                    <div className="form-control my-2">
                                                        <input type="text" name="reviewId" placeholder="" defaultValue={review._id} className="input input-bordered hidden" />
                                                    </div>
                                                </div>
                                                <div className="form-control my-2">
                                                    <textarea type='text' name="review" defaultValue={review.review} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your review here..." required></textarea>
                                                </div>
                                                <div className="form-control  mt-6 w-1/3 mx-auto my-4">
                                                    <input method="dialog" className="btn btn-info" type="submit" value="Submit" />
                                                </div>
                                            </form> */}

                                            <button onClick={openModal}>Open Modal</button>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                contentLabel="Example Modal"
                                                className="max-w-sm mx-auto md:mt-60 border bg-slate-200 border-sky-600 p-6 shadow-2xl rounded-lg h-1/3 my-auto"
                                            >
                                                <span className="font-bold text-amber-800 text-lg">Update Your Review Here.</span>
                                                <form onSubmit={(e) => { handleUpdateReview(e); closeModal; }}>
                                                    <div>
                                                        <div className="form-control my-2">
                                                            <input type="text" name="reviewId" placeholder="" defaultValue={review._id} className="input input-bordered hidden" />
                                                        </div>
                                                    </div>
                                                    <div className="form-control my-2">
                                                        <textarea type='text' name="review" defaultValue={review.review} className="block p-2.5 w-full md:min-h-[150px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Update your review here..." required></textarea>
                                                    </div>
                                                    <div className="form-control  mt-6 w-1/3 mx-auto my-4">
                                                        <input method="dialog" className="btn btn-info text-white" type="submit" value="Update" />
                                                    </div>
                                                </form>
                                            </Modal>
                                        </div>
                                    </dialog>

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

export default MyReviews;