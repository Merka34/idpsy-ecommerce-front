import { useEffect, useState } from 'react';
import CardProduct from '../Components/CardProduct/CardProduct'
import { useProduct } from '../Context/ProductContext'
import { FaTh, FaThLarge, FaThList } from 'react-icons/fa';
import { useBanner } from '../Context/BannerContext';
import MainCarousel from '../Components/MainCarousel/MainCarousel';

const Home = () => {
    const { banners, fetchBanners, loadingBanner } = useBanner();
    const { products, productsLoading, error } = useProduct();
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');

    const gridConfig = {
        small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        medium: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
    };

    useEffect(() => {
        fetchBanners(); // Una función que llame a GET /api/banners/active
    }, []);

    const cardSizes = {
        small: 'w-full',
        medium: 'w-full',
        large: 'w-full'
    };

    return (
        <div className="container mx-auto px-4 py-6">

            <section className="container mx-auto py-6 px-2 md:px-0">
                {loadingBanner ? (
                    <div className="w-full h-[300px] bg-base-300 animate-pulse rounded-box"></div>
                ) : (
                    banners.length > 0 && <MainCarousel banners={banners} />
                )}
            </section>

            {/* Header con título y controles */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Nuestros Productos</h1>
                    <p className="text-gray-600 mt-2">Descubre lo mejor para ti</p>
                </div>
                
                {/* Controles de vista */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 hidden sm:block">Vista:</span>
                    <div className="join join-horizontal">
                        <button
                            onClick={() => setGridSize('small')}
                            className={`join-item btn btn-sm ${gridSize === 'small' ? 'btn-primary' : 'btn-ghost'}`}
                            title="Vista compacta"
                        >
                            <FaTh className="text-lg" />
                        </button>
                        <button
                            onClick={() => setGridSize('medium')}
                            className={`join-item btn btn-sm ${gridSize === 'medium' ? 'btn-primary' : 'btn-ghost'}`}
                            title="Vista normal"
                        >
                            <FaThLarge className="text-lg" />
                        </button>
                        <button
                            onClick={() => setGridSize('large')}
                            className={`join-item btn btn-sm ${gridSize === 'large' ? 'btn-primary' : 'btn-ghost'}`}
                            title="Vista ampliada"
                        >
                            <FaThList className="text-lg" />
                        </button>
                    </div>
                    
                    {/* Contador de productos */}
                    {!productsLoading && !error && (
                        <span className="badge badge-neutral">
                            {products.length} productos
                        </span>
                    )}
                </div>
            </div>

            {/* Grid de productos */}
            {productsLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-4 text-gray-600">Cargando productos...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-error max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error al cargar los productos. Intenta de nuevo.</span>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No hay productos disponibles</h3>
                        <p className="mt-1 text-gray-500">Pronto agregaremos nuevos productos.</p>
                    </div>
                </div>
            ) : (
                <div className={`grid ${gridConfig[gridSize]} gap-4 md:gap-6`}>
                    {products.map((product: any) => (
                        <CardProduct 
                            key={product._id} 
                            product={product} 
                            size={gridSize}
                        />
                    ))}
                </div>
            )}

            {/* Paginación o cargar más */}
            {!productsLoading && !error && products.length > 0 && (
                <div className="mt-12 text-center">
                    <button className="btn btn-outline btn-wide">
                        Cargar más productos
                    </button>
                </div>
            )}
        </div>
    );
};
/*
const Home = () => {
    const { products, productsLoading, error } = useProduct()
    return (<div className="px-4 sm:px-6 lg:px-8 py-6">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Descubrí nuestros productos
    </h2>
    <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Encontrá lo que necesitas entre nuestra selección premium
    </p>
    
    {productsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
                <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                <p className="text-gray-500">Cargando productos...</p>
            </div>
        </div>
    ) : error ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <div className="text-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <p className="text-lg font-medium text-error mb-2">Error al cargar los productos</p>
            <p className="text-gray-600 mb-4">Por favor, intentá nuevamente más tarde</p>
            <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary btn-sm"
            >
                Reintentar
            </button>
        </div>
    ) : products.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">No hay productos disponibles</p>
            <p className="text-gray-500">Volvé a intentarlo más tarde</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product: any) => (
                <div key={product._id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <CardProduct product={product} />
                </div>
            ))}
        </div>
    )}
    
    {/* Paginación o "Ver más" si es necesario }
    {products.length > 0 && (
        <div className="mt-10 text-center">
            <button className="btn btn-outline btn-primary">
                Ver más productos
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    )}
</div>
    )
}
*/
export default Home
