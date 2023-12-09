import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://i.postimg.cc/FKypbXgs/404-error-page-not-found.jpg")` }}>
                <div className="hero-overlay bg-opacity-0"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md mt-44">
                        <h1 className="mb-5 mt-96 text-black text-5xl font-bold">Please, browse to the right URL.</h1>
                        <Link to='/' ><button className="btn btn-primary">Back Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;