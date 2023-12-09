import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useDbUsers = () => {
const {user} = useAuth();
const axiosPublic = useAxiosPublic();


    // tan stack query
    const { refetch, data: users = [] } = useQuery({ 
        queryKey: ['users'], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    return [refetch, users];
};

export default useDbUsers;