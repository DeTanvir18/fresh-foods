import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Navigate, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiCommentEdit } from "react-icons/bi";

// for image upload to imgbb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const UpdateMeal = () => {
    const { _id, title, category, rating, postDate, price, ingredients, description } = useLoaderData();
    const { register, handleSubmit, reset } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        // // console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {

            const meal = {
                title: data.name,
                img: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),
                ingredients: data.ingredients,
                description: data.description,
                rating: data.rating,
                postDate: data.date
            }
            // // console.log(meal);
            // now send the meal data to the server with the image url
            const mealRes = await axiosSecure.patch(`/meals/update/${_id}`, meal);
            // console.log(mealRes.data)
            if (mealRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${title} is Updated Successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        Navigate('/dashboard/adminAllMeals');
        reset();
    }
    return (
        <div>
            <Helmet>
                <title>Admin | Update Item</title>
            </Helmet>
            <SectionTitle heading={"update a meal"} ></SectionTitle>
            <div className="bg-pink-100 py-4 px-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Meal Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={title}
                                placeholder="Meal Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Posting Date</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={postDate}
                                placeholder="Post Date"
                                {...register('date', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="$Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Ingredients</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={ingredients}
                                placeholder="a, b, c,...."
                                {...register('ingredients', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={rating}
                                placeholder="5/4.5/4"
                                {...register('rating', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" defaultValue={description} placeholder="Type Your Meal Description here"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input text-sky-500 w-full max-w-xs" />
                    </div>
                    <button className="btn btn-accent">
                        <BiCommentEdit className="ml-4"></BiCommentEdit> Update Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;