import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="mt-2">
            <footer className="footer p-10 bg-black bg-opacity-80  text-white rounded-lg py-14">
                <h3 className="text-start text-lg md:text-xl text-white font-semibold">The World Famous <span className="text-xl md:text-3xl text-pink-800 font-semibold">Food Supply Chain</span></h3>
                <div>
                    <Link to="/"> <img src="https://i.ibb.co/KbJCxFG/logofresh-1.png" alt="" /></Link>
                    <p className="font-bold">The Fresh Foods Inc.<br />Providing reliable educational services since 2000</p>
                </div>
                <div>
                    <div className='md:flex gap-7'>
                        <Link to="https://facebook.com/"><img src='https://i.postimg.cc/Dysx5LPP/Group-9969.png' /></Link>
                        <div>
                            <img src="https://i.postimg.cc/Pr4wtqXk/Frame-2.png" alt="" />
                            <div>
                                <p>333-4533-3555</p>
                                <p>883-3535-5345</p>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/hG7v74Bv/Frame-3.png" alt="" />
                            <div>
                                <p>fresh.foods@gmail.com</p>
                                <p>product.fresh.food@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.postimg.cc/wvfPFcYk/new.jpg" alt="" />
                            <div>
                                <p>333, Saint Luis,<br />Arizona, USA</p>
                            </div>
                        </div>
                    </div>
                    <hr className="bg-white" />
                    <p className="font-semibold">© 2015 - 23 The Fresh Foods Inc. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
