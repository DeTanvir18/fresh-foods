import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MembershipSection = () => {

    const membershipPackages = [
        {
            "packageType": "Silver",
            "price": 9.99,
            "img": "https://i.ibb.co/gM9wXrt/rsz-goldas-50g-silver-bullion-in-assay-card.jpg"
        },
        {
            "packageType": "Gold",
            "price": 14.99,
            "img": "https://i.ibb.co/vZYh5dk/rsz-1goldbar-veriscan-3.jpg"
        },
        {
            "packageType": "Platinum",
            "price": 19.99,
            "img": "https://i.ibb.co/4WyQG6k/rsz-paybackcard.png"
        },
    ];

    const handleCardClick = (price) => {
        // Redirect to the checkout page with the selected package name
        // window.location.href = `/checkout/${packageType}`;
    };

    return (
        <div>
            <div className="mx-auto max-w-2xl my-20">
                <SectionTitle heading={"Choose Package"}></SectionTitle>
                <div className="md:flex space-x-4 max-w-lg mx-auto justify-center items-center">
                    {
                        membershipPackages.map((plan, index) => <div key={index}>
                            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                                <div className="px-2 py-4">
                                    <img className="max-w-sm" src={plan.img} alt="" />
                                    <div className="font-bold text-xl mb-2">{plan.packageType} Package</div>
                                    <p className="text-gray-700 text-base">${plan.price.toFixed(2)} / month</p>
                                </div>
                                <div className="px-6 py-4">
                                    <button
                                        onClick={()=>handleCardClick(plan.price.toFixed(2))}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Purchage
                                    </button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MembershipSection;