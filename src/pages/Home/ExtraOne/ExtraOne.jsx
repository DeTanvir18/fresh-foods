import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ExtraOne = () => {
    return (
        <div>
            <div className="px-1 mt-10">
                <div className="bg-[#ebebeb] rounded-lg py-4">
                    <SectionTitle heading={"Details"}></SectionTitle>
                    <div className="flex flex-col md:flex-row gap-5 max-w-[1200px] mx-auto my-14 rounded-lg">
                        <div className="md:w-1/2 text-center p-1">
                            <h2 className="text-xl font-bold text-sky-600 mt-12 mb-2">Fresh Foods Inc</h2>
                            <p className="text-amber-800 text-sm">
                                Fresh Foods Inc is a leading company dedicated to delivering exceptional freshness and quality in every bite. Specializing in farm-fresh produce and gourmet goods, we prioritize sustainability and responsible sourcing. Our diverse range of premium offerings caters to discerning palates, offering a rich array of flavors and nutritional benefits. Committed to supporting local farmers and promoting healthy living, we strive to redefine the food industry. Through meticulous quality control and a passion for excellence, Fresh Foods Inc stands as a trusted provider of culinary delights, inspiring a healthier, more flavorful world for individuals and families alike.
                            </p>
                        </div>
                        <div className="flex justify-center items-center md:w-1/2  bg-cover bg-center text-white rounded-2xl">
                            <img className="rounded-lg" src="https://i.ibb.co/d56scky/2023-Food-Co-Op-Graphic-No-Info-ENG16x9950x500.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraOne;