import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';

const MainCarousel = ({ banners }) => {
    const navigate = useNavigate();

    // Validar que hay banners disponibles
    const activeBanners = Array.isArray(banners) ? banners.filter((x: any) => x && x.isActive) : [];

    // Si no hay banners, mostrar placeholder
    if (activeBanners.length === 0) {
        return (
            <div className="w-full h-[300px] md:h-[500px] mb-8 bg-base-300 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">No hay banners disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] md:h-[500px] mb-8">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full rounded-2xl overflow-hidden"
                loop={activeBanners.length > 1}
                allowTouchMove={true}
            >
                {activeBanners.map((banner: any) => (
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
                            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-start px-8 md:px-12 text-white">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{banner.title}</h2>
                                <p className="text-lg md:text-xl drop-shadow-lg mb-4">{banner.subtitle}</p>
                                <button className="btn btn-primary btn-sm md:btn-md">Ver oferta</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MainCarousel