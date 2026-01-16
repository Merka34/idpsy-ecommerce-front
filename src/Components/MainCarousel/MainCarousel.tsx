import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MainCarousel = ({ banners }) => {
    const navigate = useNavigate();

    // Validar que hay banners disponibles
    const activeBanners = Array.isArray(banners) ? banners.filter((x: any) => x && x.isActive) : [];

    // Si no hay banners, mostrar placeholder
    if (activeBanners.length === 0) {
        return (
            <div className="w-full h-[300px] md:h-[500px] mb-8 rounded-3xl flex items-center justify-center anime-gradient">
                <div className="text-center">
                    <p className="text-white text-xl font-semibold">🎌 No hay banners disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden glow-effect">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full"
                loop={activeBanners.length > 1}
                allowTouchMove={true}
            >
                {activeBanners.map((banner: any) => (
                    <SwiperSlide key={banner._id} className="relative">
                        <div 
                            className="relative w-full h-full cursor-pointer group anime-gradient"
                            onClick={() => navigate(banner.link)}
                        >
                            {/* Imagen de fondo */}
                            {banner.imageUrl && (
                                <img 
                                    src={banner.imageUrl} 
                                    className="absolute inset-0 w-full h-full object-cover opacity-80" 
                                    alt={banner.title}
                                    loading="lazy"
                                />
                            )}
                            
                            {/* Overlay gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3e5275]/90 via-[#3e5275]/70 to-transparent"></div>
                            
                            {/* Contenido */}
                            <div className="relative h-full flex flex-col justify-center items-start px-6 sm:px-8 md:px-12 lg:px-16 text-white">
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-3xl">🌸</span>
                                        <span className="text-sm font-semibold text-[#feed01] uppercase tracking-wider">
                                            Oferta Especial
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight animate-slide-up">
                                        {banner.title}
                                    </h2>
                                    <p className="text-base md:text-xl drop-shadow-lg opacity-90 max-w-xl">
                                        {banner.subtitle}
                                    </p>
                                    <button 
                                        className="btn btn-lg md:btn-lg bg-[#feed01] hover:bg-yellow-400 text-[#3e5275] border-0 font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                                    >
                                        <span>✨ Ver oferta</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Estilo personalizado para paginación */}
            <style>{`
                .swiper-pagination-bullet {
                    background-color: rgba(255, 255, 255, 0.5) !important;
                    width: 12px;
                    height: 12px;
                }
                .swiper-pagination-bullet-active {
                    background-color: #feed01 !important;
                    box-shadow: 0 0 10px rgba(254, 237, 1, 0.8);
                }
                .swiper-pagination {
                    bottom: 20px !important;
                }
            `}</style>
        </div>
    );
};

export default MainCarousel