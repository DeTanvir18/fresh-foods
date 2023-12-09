// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function App() {
    return (
        <>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div>
                        <div className="bg-[url('https://i.ibb.co/hCPxVTn/Wedding-Catering1200x800.jpg')] bg-cover bg-center rounded-sm">
                            <div className="bg-black bg-opacity-40 ">
                                <div className="max-w-4xl mx-auto text-white text-left pt-10 lg:pt-40 px-1 md:px-16 pb-24">
                                    <h1 className="mb-5 text-xl md:text-2xl font-bold">You are in the Right Way towards your <br /><span className="text-pink-700 text-4xl">Desired Meal</span></h1>
                                    <p className="mb-5 text-xs md:text-sm lg:text-lg font-semibold">Welcome to the Fresh Foods Solution Private Limited! Where dreams come to life. Let us create unforgettable moments together at your Desired Meal!</p>
                                    <form className="ps-2 md:ps-0 mb-8">
                                        <input className="border p-3 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                        <input className="bg-sky-700 text-white font-semibold px-6 py-[13px] rounded-r-lg" type="submit" value="Get Started" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="bg-[url('https://i.ibb.co/34VKM4Z/QX90-Eh-Bq-RD2-Cnh-Mt-CKSvfile1200x800.jpg')] bg-cover bg-center rounded-sm">
                            <div className="bg-black bg-opacity-40 ">
                                <div className="max-w-4xl mx-auto text-white text-left pt-10 lg:pt-40 px-1 md:px-16 pb-24">
                                    <h1 className="mb-5 text-3xl md:text-4xl font-bold">You are in the Right Way towards your <br /><span className="text-pink-700">Desired Meal</span></h1>
                                    <p className="mb-5 text-xs md:text-sm lg:text-lg font-semibold">Welcome to the Fresh Foods Solution Private Limited! Where dreams come to life. Let us create unforgettable moments together at your Desired Meal!</p>
                                    <form className="ps-2 md:ps-0 mb-8">
                                        <input className="border p-3 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                        <input className="bg-sky-700 text-white font-semibold px-6 py-[13px] rounded-r-lg" type="submit" value="Get Started" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="bg-[url('https://i.ibb.co/hW11gzP/21186de396a344fb86aebdfce6b78d0f51200x800.jpg')] bg-cover bg-center rounded-sm">
                            <div className="bg-black bg-opacity-40 ">
                                <div className="max-w-4xl mx-auto text-white text-left pt-10 lg:pt-40 px-1 md:px-16 pb-24">
                                    <h1 className="mb-5 text-3xl md:text-4xl font-bold">You are in the Right Way towards your <br /><span className="text-pink-700">Desired Meal</span></h1>
                                    <p className="mb-5 text-xs md:text-sm lg:text-lg font-semibold">Welcome to the Fresh Foods Solution Private Limited! Where dreams come to life. Let us create unforgettable moments together at your Desired Meal!</p>
                                    <form className="ps-2 md:ps-0 mb-8">
                                        <input className="border p-3 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                        <input className="bg-sky-700 text-white font-semibold px-6 py-[13px] rounded-r-lg" type="submit" value="Get Started" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className="bg-[url('https://i.ibb.co/xh39btc/Catering-Featured1348x1200x800.jpg')] bg-cover bg-center rounded-sm">
                            <div className="bg-black bg-opacity-40 ">
                                <div className="max-w-4xl mx-auto text-white text-left pt-10 lg:pt-40 px-1 md:px-16 pb-24">
                                    <h1 className="mb-5 text-3xl md:text-4xl font-bold">You are in the Right Way towards your <br /><span className="text-pink-700">Desired Meal</span></h1>
                                    <p className="mb-5 text-xs md:text-sm lg:text-lg font-semibold">Welcome to the Fresh Foods Solution Private Limited! Where dreams come to life. Let us create unforgettable moments together at your Desired Meal!</p>
                                    <form className="ps-2 md:ps-0 mb-8">
                                        <input className="border p-3 rounded-l-lg pe-8 md:pe-20 shadow mb-1" style={{ background: 'white' }} type="text" name="search" id="" placeholder="Search Here..." />
                                        <input className="bg-sky-700 text-white font-semibold px-6 py-[13px] rounded-r-lg" type="submit" value="Get Started" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
