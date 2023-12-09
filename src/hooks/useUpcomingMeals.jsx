import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();

    // tan stack query
    const { refetch, data: upcomingMeals = [] } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeals');
            return res.data;
        }
    })
    return [refetch, upcomingMeals];
};

export default useUpcomingMeals;