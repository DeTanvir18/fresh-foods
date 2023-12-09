import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MealCard from "../Shared/MealCard/MealCard";
import useMeals from "../../hooks/useMeals";


const UpcomingMeals = () => {
    const [meals, refetch] = useMeals();
    // filter upcoming meals
    const upcomingMeals = meals.filter(meal => meal.status === 'upcoming');

    
    return (
        <div>
            <Helmet>
                <title>Fresh Foods | Upcoming Meals</title>
            </Helmet>
            <SectionTitle heading={"Explore Upcomings"}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl gap-8 mx-auto my-20 px-2">

                {upcomingMeals
                    ?
                    upcomingMeals.map(meal => <MealCard
                        key={meal._id}
                        meal={meal}
                    ></MealCard>)
                    :
                    <div className="flex flex-col justify-center items-center">
                        <p className="my-16 text-center text-2xl text-pink-500 font-bold mx-auto">You have no meal To Display.</p>
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

export default UpcomingMeals;