import useMeals from "../../../hooks/useMeals";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MealCard from "../../Shared/MealCard/MealCard";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


const MealsByCategory = () => {
    const [meals, refetch] = useMeals();
    // filter the approved meals
    const approvedMeals = meals.filter(meal => meal.status === 'approved');

    const breakfast = approvedMeals.filter(meal => meal.category === "Breakfast");
    const lunch = approvedMeals.filter(meal => meal.category === "Lunch");
    const dinner = approvedMeals.filter(meal => meal.category === "Dinner");

    return (
        <div>
            <SectionTitle heading={"Explore Your Need"}></SectionTitle>
            <div className='flex justify-center items-center mt-6'>
                <Tabs>
                    <TabList selectedTabClassName="selected-tab" className='grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-center p-2 px-6 md:px-32 bg-slate-100 shadow-xl text-xs lg:text-lg'>
                        <Tab className='me-5  px-1 rounded bg-sky-500 text-white font-semibold'>Breakfast</Tab>
                        <Tab className='me-5  px-1 rounded bg-sky-500 text-white font-semibold'>All Meals</Tab>
                        <Tab className='me-5  px-1 rounded bg-sky-500 text-white font-semibold'>Lunch</Tab>
                        <Tab className='me-5  px-1 rounded bg-sky-500 text-white font-semibold'>Dinner</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-6 mx-auto mt-8 mb-6 px-2">

                            {breakfast
                                ?
                                breakfast.map(meal => <MealCard
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
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-6 mx-auto mt-8 mb-6 px-2">

                            {approvedMeals
                                ?
                                approvedMeals.map(meal => <MealCard
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
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-6 mx-auto mt-8 mb-6 px-2">

                            {lunch
                                ?
                                lunch.map(meal => <MealCard
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
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-6 mx-auto mt-8 mb-6 px-2">

                            {dinner
                                ?
                                dinner.map(meal => <MealCard
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
                    </TabPanel>
                </Tabs>
            </div>
            <div className="text-center mx-auto">
                <Link to='/allmeals'>
                    <AwesomeButton className="btn mx-4 mb-8 text-white text-lg" type="primary">
                        See All
                    </AwesomeButton>
                </Link>
            </div>
            <div>

            </div>
        </div>
    );
};

export default MealsByCategory;