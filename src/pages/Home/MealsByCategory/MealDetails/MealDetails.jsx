import { Helmet } from "react-helmet-async";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FcApproval, FcLike, FcPlus } from "react-icons/fc";
import { BiLike, BiCommentAdd } from "react-icons/bi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useReviews from "../../../../hooks/useReviews";



const MealDetails = () => {
    const { user } = useAuth();
    const mealDetails = useLoaderData();
    const { _id, title, img, distributor, rating, postDate, companyLogo, price, ingredients, description, likeCount, reviewCount } = mealDetails;

    // for reviews
    const [reviews, refetch] = useReviews();
    const mealReviews = reviews.filter(review => review.mealTitle === title);

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();


    // for location
    const navigate = useNavigate();
    const location = useLocation();
    // for using the hook (useAxiosSecure)
    const axiosSecure = useAxiosSecure();
    // to get refetch to update user cart count
    // const [refetch, cart] = useCart();
    // for meal request and like count
    const [requested, setRequested] = useState(false);
    const [liked, setLiked] = useState(false);
    // for increasing like and comment count
    const [newLikeCount, setNewLikeCount] = useState(likeCount);
    const [newReviewCount, setNewReviewCount] = useState(reviewCount);




    const handleAddToCart = () => {
        if (user && user?.email) {
            // // console.log(user?.email);
            // Done: send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name: user.displayName,
                title,
                img,
                price,
                status: "Pending",
                likeCount: likeCount,
                reviewCount
            }
            // send menu data with user email (to database)
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        setRequested(true);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${title} has been added to your meals list`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch to update user cart count
                        // refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged In!",
                text: "Please, log in to request meal!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to the login page
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }


    const handleLikeCount = () => {
        if (user && user?.email) {
            axiosSecure.post(`/meals/likes/${_id}`)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.modifiedCount) {
                        setLiked(true);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Your like has been added to the list for ${title}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch to update user cart count
                        setNewLikeCount(likeCount + 1);
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged In!",
                text: "Please, log in to like meals!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to the login page
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }


    const onSubmit = async (data) => {
        if (user && user?.email) {
            const review = {
                mealTitle: title,
                userEmail: user?.email,
                userImg: user?.photoURL,
                userName: user?.displayName,
                likeCount,
                reviewCount,
                menuId: _id,
                review: data.review
            }
            axiosPublic.post('/reviews', review)
                .then(res => {
                    if (res.data.insertedId) {
                        reset();
                        axiosSecure.post(`/meals/reviews/${_id}`)
                            .then(res => {
                                if (res.data.modifiedCount) {
                                    setNewReviewCount(reviewCount + 1);
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: `Your review has been added to the list for ${title}`,
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                    }
                })
                .catch(error =>  console.log(error))
        }
        else {
            Swal.fire({
                title: "You are not logged In!",
                text: "Please, log in to like meals!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to the login page
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div>
            <Helmet>
                <title>Fresh Foods | Meal Details</title>
            </Helmet>
            <div className="mt-10 md:mt-20 mb-96 max-w-[920px] mx-auto p-2">
                <div className="w-full shadow rounded-lg ms-1 md:ms-0">
                    <img className="w-full rounded-lg" src={img} alt="donation-img" />
                    <div className="space-y-1 py-3 ms-4 max-w-md">
                        <hr />
                        <hr />
                        <div className="text-center">
                            <h3 className="text-xl  text-amber-700 font-semibold">{title}</h3>
                            <h3 className="text-xs text-sky-800 font-bold ms-2">Company: {distributor}</h3>
                            <h3 className="text-sm font-semibold ms-2">Ingredients: {ingredients}</h3>
                        </div>
                        <hr />
                        <hr />
                    </div>
                    <div className="flex flex-col h-full shadow-lg border rounded-lg mx-2 p-1">
                        <div className="flex flex-col h-full lg:flex-row justify-center lg:justify-start items-center gap-2">
                            <div>
                                <figure><img className="w-40 rounded-t-lg  lg:rounded-tl-lg me-16" src={companyLogo || img} alt="donation-img" /></figure>
                            </div>
                            <div className="flex flex-col md:flex-row justify-start items-center mx-0 lg:mx-2 mt-5 space-y-3 p-2 md:p-4">
                                <div className="text-orange-800">
                                    <div className="space-y-1">
                                        <Rating
                                            style={{ maxWidth: 110 }}
                                            value={rating}
                                            readOnly
                                            className=""
                                        />
                                        <h3><span className="font-bold text-sm">Price:</span> ${price}</h3>
                                    </div>
                                    <div className="space-y-1">
                                        <h3><span className="font-bold text-sm">Posted In: </span>{postDate}</h3>
                                        <h3 className="flex items-center gap-1 text-sm"><span className="font-bold flex items-center"><FcLike></FcLike> Likes: </span>{newLikeCount}</h3>
                                        <h3 className="flex items-center gap-1 text-sm"><span className="font-bold flex items-center"><BiCommentAdd></BiCommentAdd> Reviews: </span>{newReviewCount}</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    mealDetails.status === 'approved' ?
                                        <>
                                            {
                                                !requested ? <>
                                                    <button onClick={handleAddToCart} className="flex justify-center items-center text-md text-amber-700 font-bold mb-2 px-5 py-2 border-2 rounded shadow-2xl"><FcPlus></FcPlus>  <span>Request</span></button>
                                                </>
                                                    :
                                                    <>
                                                        <button className="flex justify-center items-center text-md text-amber-700 font-bold mb-2 px-5 py-2 border-2 rounded shadow-2xl"><FcApproval></FcApproval>  <span>Requestd</span></button>
                                                    </>
                                            }
                                        </>
                                        :
                                        <></>
                                }
                                {
                                    !liked ? <>
                                        <div onClick={handleLikeCount} className="flex justify-center items-center  text-sky-700 font-medium mb-3 shadow-lg"><BiLike></BiLike>  <span>Like it</span></div>
                                    </>
                                        :
                                        <>
                                            <div className="flex justify-center items-center text-sky-700 font-medium mb-3 shadow-lg"><FcLike></FcLike>  <span>Liked</span></div>
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-purple-800 border border-sky-100 font-medium p-3">{description}</p>
                    </div>
                </div>

                <div className="w-4/12 mx-auto md:mt-28 text-center">
                    <h3 className="md:text-3xl text-sky-500 font-bold uppercase md:border-x-4 border-pink-500 py-2">See Reviews</h3>
                </div>
                <div className="flex flex-col items-start max-w-[750px] mx-auto p-2 rounded-lg mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto">
                        {
                            mealReviews.map(review => <div key={review._id} className="mx-auto max-w-md border-2 rounded-tl-2xl my-4 px-2 bg-slate-200">
                                <div className="flex flex-col h-full md:flex-row justify-center lg:justify-start items-center gap-2 px-2 my-4">
                                    <div>
                                        <figure><img className="w-28 rounded-full  lg:rounded-tr-lg me-2" src={review?.userImg} alt="admin-img" /></figure>
                                    </div>
                                    <div className="flex flex-col justify-start items-center max-w-[200px] mx-0 p-2">
                                        <div className="text-orange-800">
                                            <div className="space-y-1">
                                                <h3><span className="font-bold text-xs text-sky-500"></span> {review?.userName}</h3>
                                            </div>
                                            <div className="space-y-1">
                                                <h3><span className="font-bold text-xs text-sky-500"></span> {review?.userEmail}</h3>
                                            </div>
                                            <p className="text-sky-700 text-xs">{review.review}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="flex flex-col justify-start items-start w-full px-1 md:px-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto">
                            <h3 className="text-lg font-semibold text-pink-800">Wanna add a review?</h3>
                            <div className="form-control">
                                <textarea {...register('review', { required: true })} className="textarea textarea-bordered h-24" placeholder="Your Comment"></textarea>
                            </div>
                            <button className="btn bg-amber-700 mt-1 text-sm text-white font-bold px-2 py-1">
                                <BiCommentAdd></BiCommentAdd>Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;