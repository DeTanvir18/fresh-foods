

const SectionTitle = ({ heading }) => {
    return (
        <div className="w-4/12 mx-auto mb-3 md:mt-20 md:mb-8 text-center">
            <h3 className="md:text-3xl text-sky-500 font-bold uppercase md:border-x-4 border-pink-500 py-6">{heading}</h3>
        </div>
    );
};

export default SectionTitle;