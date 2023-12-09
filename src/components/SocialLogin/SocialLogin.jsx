import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogin = ({ task }) => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();



    const handleGoogleSignIn = () => {

        googleSignIn()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    img: result.user?.photoUrl,
                    badge: "Bronze"
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            title: 'Successfully Logged In via Google',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        navigate(from, { replace: true });

                    })
                    .catch(error => {
                        // console.log('error', error.message)
                    })
            })
            .catch(error => {
                // console.log('error', error.message)
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className='w-full mb-2 btn btn-primary bg-amber-500'>
                    <img src="https://i.ibb.co/S0WtyHP/761177025x25.png" alt="google" /> Google {task}
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;