import { Link } from "react-router-dom";
import { BsInfoSquare } from 'react-icons/bs';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const MealCard = ({ meal }) => {
    const { _id, title, img, distributor, rating, postDate, price } = meal;


    return (
        <div>
            <div className="px-2">
                <div className="rounded-lg flex flex-col h-full">
                    <div className="flex flex-col h-full shadow-2xl rounded-lg">
                        <figure><img className="w-full rounded-t-lg" src={img} alt="donation-img" /></figure>
                        <div className="p-2 flex flex-col justify-between flex-grow flex-1">
                            <div className="space-y-1 py-3">
                                <hr />
                                <hr />
                                <div className="ms-4">
                                    <h3 className="text-xl  text-amber-700 font-semibold">{title}</h3>
                                    <h3 className="text-xs text-sky-800 font-bold ms-2">Company: {distributor}</h3>
                                </div>
                                <hr />
                                <hr />
                            </div>
                            <div className="text-sm gap-3 text-orange-800">
                                <div className="space-y-1">
                                    <h3><span className="font-bold">Price:</span> ${price}</h3>
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={rating}
                                        readOnly
                                        className=""
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3><span className="font-bold">Posted on:</span>{postDate}</h3>
                                </div>
                            </div>
                            <div className="text-left">
                                <Link to={`/meal/${_id}`}>
                                    <button className="btn btn-info text-[14px] font-medium mt-5 mb-3 px-5 rounded-2xl"><BsInfoSquare></BsInfoSquare> Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;