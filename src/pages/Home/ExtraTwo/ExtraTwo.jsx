
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft } from "react-icons/fa6";
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const ExtraTwo = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    return (
        <div>
            <div className="slider-container mt-8 mb-8 max-w-[1200px] mx-auto">
                <div className="max-w-[700px] mx-auto text-center">
                    <SectionTitle heading={"Explor Here"}></SectionTitle>
                    <p className="text-[10px] md:text-[13px] font-medium mb-8">Explore endless opportunities. Fresh Foods Inc is a leading company dedicated to delivering exceptional freshness and quality in every bite. Specializing in farm-fresh produce and gourmet goods, we prioritize sustainability and responsible sourcing. Our diverse range of premium offerings caters to discerning palates, offering a rich array of flavors and nutritional benefits. Committed to supporting local farmers and promoting healthy living, we strive to redefine the food industry.</p>
                </div>
                <Slider {...settings} >
                    <div>
                        <img src="https://i.ibb.co/HtcR8z2/5941200yummyveggieomelet-Allrecipes-Phot4x3o9731d76434de4b7daae40281f56a7a661000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/XzSZKy0/Chicken-Tenders-Shortage-FTBLOG12216b8d70dd6e7c4269bb1ee00a8c59b4631000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/KjCWHvQ/Fruit-Salad-Shot4201000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/qjy6tJb/Chocolate-Lava-Cakes11000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/y6qQzHL/mangotangocrush1000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/SQBMpdF/grilledsalmonwithmustardbutter1000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/hD6WgN3/beefstirfryselfproclaimedfoodie81000x500.jpg" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/zSkGRR4/veggiepizzapromo2000f80fb428272747a6bd5867792e7060e31000x500.jpg" />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default ExtraTwo;