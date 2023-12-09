import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";



// for image upload to imgbb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddMeal = () => {
    const { user } = useAuth();
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
                companyLogo: res.data.data.display_url,
                category: data.category,
                distributor: user?.displayName,
                email: user?.email,
                price: parseFloat(data.price),
                ingredients: data.ingredients,
                description: data.description,
                status: "approved",
                rating: data.rating,
                postDate: data.date,
                likeCount: 0,
                reviewCount: 0,
            }
           const mealRes = await axiosSecure.post('/meals', meal);
            if (mealRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the meals.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
         }

    
    return (
        <div className="mb-16">
            <Helmet>
                <title>Admin | Add Meal</title>
            </Helmet>
            <SectionTitle heading="Wanna add something?" ></SectionTitle>
            <div className="bg-pink-100 py-4 px-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Meal Name</span>
                            </label>
                            <input
                                type="text"
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
                            <select defaultValue="default" {...register('category', { required: true })}
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
                                type="text"
                                placeholder="$Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* ingredients */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Ingredients</span>
                            </label>
                            <input
                                type="text"
                                placeholder="a, b, c,...."
                                {...register('ingredients', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* rating */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input
                                type="text"
                                placeholder="5/4.5/4"
                                {...register('rating', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Type Your Meal Description here"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input bg-sky-500 text-white w-full max-w-xs" />
                    </div>
                    <button className="btn btn-secondary">
                        <FaUtensils className="ml-4"></FaUtensils> Add Meal
                    </button>
                </form>
                </div>
        </div>
    );
};

export default AddMeal;