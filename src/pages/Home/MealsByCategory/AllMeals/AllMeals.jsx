import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import MealCard from "../../../Shared/MealCard/MealCard";
import useMeals from "../../../../hooks/useMeals";
// import InfiniteScroll from 'react-infinite-scroll-component';


const AllMeals = () => {
    const [meals, refetch] = useMeals();
    // filter the approved meals
    const approvedMeals = meals.filter(meal => meal.status === 'approved');


    // for search
    const [searchedMeals, setSearchedMeals] = useState([]);
    // for filter
    const [selectedValue, setSelectedValue] = useState('All');


    useEffect(() => {
        setSearchedMeals(approvedMeals);
    }, [meals])

    const handleSearch = e => {
        e.preventDefault();
        const searchValue = e.target.search.value.toLowerCase();

        if (searchValue) {
            const displayedMeals = approvedMeals.filter(
                meal => meal.title.toLowerCase().includes(searchValue)
            );
            setSearchedMeals(displayedMeals);
            if (!displayedMeals.length) {
                setSearchedMeals([]);
                Swal.fire({
                    icon: 'warning',
                    text: 'No matching item found',
                })
            }
        }
    }

    const handleSelectChange = (e) => {
        const filteredCategory = e.target.value;
        setSelectedValue(filteredCategory);
        if (filteredCategory === "All") {
            setSearchedMeals(approvedMeals);
            return;
        }
        if (filteredCategory !== "All") {
            const filteredMeals = approvedMeals.filter(meal => meal.category === filteredCategory);
            setSearchedMeals(filteredMeals);
        }
    };



    return (
        <div>
            <Helmet>
                <title>Fresh Foods | All Meals</title>
            </Helmet>
            <div className="mt-5 space-y-7">
                {/* search input field */}
                <div className="w-full flex flex-col  justify-center items-center text-center pt-24 pb-28 ps-2 lg:ps-0">
                    <h2 className="text-4xl text-amber-700 font-bold">See All Meals</h2>
                    <p className="text-sky-800">We offer all the demanding meal you would love to see.<br /> Start finding your desired meal with us. We are desperately waiting for you to come with us and explore us.<br /> Hope you will not be disappointed.</p>
                    <form onSubmit={handleSearch} className="mt-2 ps-2 md:ps-0">
                        <input className="border p-3 rounded-l-lg pe-14 md:pe-32 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Job Title here..." />
                        <input className="bg-[#2a6bab] text-white font-semibold px-6 py-[13px] rounded-r-lg" type="submit" value="Search" />
                    </form>
                </div>
            </div>
            {/* for filter */}
            <div className="md:flex justify-center items-center">
                <div className="max-w-5xl mx-auto my-5 text-sky-500 font-bold text-center flex justify-start items-center gap-4">
                    <span className="text-amber-800">Filter: Category</span>
                    <select
                        value={selectedValue}
                        onChange={handleSelectChange}
                        className="block p-2 bg-white border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value="All">All</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>
                <div className="max-w-5xl mx-auto my-5 text-sky-500 font-bold text-center flex justify-start items-center gap-4">
                    <span className="text-amber-800">Filter: Price</span>
                    <select
                        className="block p-2 bg-white border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value="">170+</option>
                        <option value="">170-250</option>
                        <option value="">250-500</option>
                        <option value="">500+</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl gap-8 mx-auto my-10 px-2">

                {searchedMeals
                    ?
                    searchedMeals.map(meal => <MealCard
                        key={meal._id}
                        meal={meal}
                    ></MealCard>)
                    :
                    <div className="flex flex-col justify-center items-center">
                        <p className="my-16 text-center text-2xl text-pink-500 font-bold mx-auto">You have no Meal To Display.</p>
                        <div className='text-center my-12'>
                            <span className="loading loading-spinner text-primary"></span>
                            <span className="loading loading-spinner text-secondary"></span>
                            <span className="loading loading-spinner text-accent"></span>
                            <span className="loading loading-spinner text-neutral"></span>
                            <span className="loading loading-spinner text-info"></span>
                            <span className="loading loading-spinner text-success"></span>
                            <span className="loading loading-spinner text-warning"></span>
                            <span className="loading loading-spinner text-error"></span>
                        </div>
                        <progress className="progress w-56"></progress>
                    </div>
                }
            </div>
        </div>
    );
};

export default AllMeals;