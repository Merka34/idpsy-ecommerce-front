import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';

const MainCarousel = ({ banners }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-[300px] md:h-[500px] mb-8">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full rounded-2xl overflow-hidden"
            >
                {banners.filter((x : any)=> x.isActive).map((banner: any) => (
                    <SwiperSlide key={banner._id}>
                        <div 
                            className="relative w-full h-full cursor-pointer group"
                            onClick={() => navigate(banner.link)}
                        >
                            <img 
                                src={banner.imageUrl} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                alt={banner.title} 
                            />
                            {/* Overlay de texto (opcional) */}
                            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-12 text-white">
                                <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                                <p className="text-xl">{banner.subtitle}</p>
                                <button className="btn btn-primary mt-4 w-fit">Ver oferta</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MainCarousel