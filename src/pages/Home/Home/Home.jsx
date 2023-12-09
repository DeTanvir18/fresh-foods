import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import ExtraOne from "../ExtraOne/ExtraOne";
import ExtraTwo from "../ExtraTwo/ExtraTwo";
import MealsByCategory from "../MealsByCategory/MealsByCategory";
import MembershipSection from "../MembershipSection/MembershipSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Fresh Foods | Home</title>
            </Helmet>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <ExtraOne></ExtraOne>
            <ExtraTwo></ExtraTwo>
            <MembershipSection></MembershipSection>
        </div>
    );
};

export default Home;