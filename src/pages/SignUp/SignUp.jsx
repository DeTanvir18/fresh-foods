
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";


// for image upload to imgbb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    // to hide and show password
    const [hide, setHide] = useState(true);
    // axios public
    const axiosPublic = useAxiosPublic();
    // importing create user from [AuthContext]
    const { createUser, updateUserProfile } = useAuth();
    // for react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // for navigate to another route
    const navigate = useNavigate();

    // form: on submit function
    // this [react-hook-form] automatically collects data from the [form]
    const onSubmit = async data => {
        // console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // [signUp/createUser] function
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                //[update-user-photo] function to update photo
                updateUserProfile(data.name, res.data.data.display_url)
                    .then(() => {
                        updateUserProfile(data.name, data.photoUrl)
                            .then(() => {
                                // create user entry in the database
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    img: data.photo,
                                    badge: "Bronze"
                                }
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            // console.log('user added to the database')
                                            reset();
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate('/');
                                        }
                                    })
                            })
                    })
                    .catch(error =>  console.log(error))

            })
        navigate('/');
    }

    return (
        <>
            <Helmet>
                <title>Fresh Foods | Sign Up</title>
            </Helmet>
            <div className="min-h-screen bg-base-200 lg:py-40" style={{ backgroundImage: `url("https://i.ibb.co/5kjwXJt/242389041.jpg")` }}>
                <div className="hero-content lg:ms-24">
                    <div className="card md:w-1/2 max-w-md shadow-2xl bg-base-100  bg-opacity-60">
                        <h1 className="text-5xl font-bold my-5 mx-4 text-sky-500">Please Sign Up!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {/* errors will return when field validation fails  */}
                                {errors.name && <span className="text-red-600 font-semibold my-1">Name is required</span>}
                            </div>
                            {/* image file choosing */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input {...register('image', { required: true })} type="file" className="file-input bg-pink-700 text-white w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {/* errors will return when field validation fails  */}
                                {errors.email && <span className="text-red-600 font-semibold my-1">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                {/* password input with [react-hook-form] validation */}
                                <input type={hide ? "password" : "text"} name="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
                                    placeholder="password" className="input input-bordered" />
                                <button className="btn btn-xs bg-transparent mt-1 w-1/2 text-pink-500 border-sky-200" onClick={() => setHide(!hide)}>{hide ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</button>
                                {/* another system of showing errors */}
                                {errors.password?.type === 'required' && <p className="text-red-600 font-semibold py-1">Password is required</p>}
                                {/* error for [minLength] */}
                                {errors.password?.type === 'minLength' && <p className="text-red-600 font-semibold py-1">Password must be at least 6 characters</p>}
                                {/* error for [pattern] */}
                                {errors.password?.type === 'pattern' && <p className="text-red-600 font-semibold py-1">Password must contain at least one uppercase, one lowercase, one number and one special character</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn text-white bg-sky-500" value="Sign Up" />
                            </div>
                        </form>
                        <div className="form-control mt-6">
                            <div className="w-1/2 mx-auto">
                                <SocialLogin task='Sign Up'></SocialLogin>
                            </div>
                            <p className="text-center text-[#6e2a65] my-2"><small>Already conneted? <Link to="/login" className="font-bold">Login here</Link></small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
