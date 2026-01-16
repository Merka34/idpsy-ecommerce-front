import { useEffect, useRef, useState } from 'react'
import { useProduct } from '../Context/ProductContext'
import { useParams } from 'react-router'
import { useCart } from '../Context/CartContext'
import { useWishlist } from '../Context/WishlistContext'
import { FaCheck, FaHeart, FaMinus, FaPlus, FaShareAlt, FaShieldAlt, FaShoppingCart, FaStar, FaTruck, FaUndo } from 'react-icons/fa';

const DetailProduct = () => {
    const { id } = useParams();
    const { getProductById, product, productLoading } = useProduct();
    const { addToCart, openModal } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const imgRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    // 1. Cargar el producto (Solo cuando cambia el ID)
    useEffect(() => {
        if (id) {
            getProductById(id);
        }
    }, [id, getProductById]);

    // 2. Resetear el índice de imagen si cambias de un producto a otro
    // Usamos el ID del producto para saber cuándo cambió realmente
    useEffect(() => {
        setSelectedImage(0);
    }, [product?._id]);

    // 3. Verificar si el producto está en la lista de deseos
    useEffect(() => {
        if (product?._id && wishlist) {
            const isInWishlist = wishlist.some((item) => item._id === product._id);
            setIsFavorite(isInWishlist);
        }
    }, [product?._id, wishlist]);

    // 3. Guardián de carga (Evita que el resto del código falle)
    if (productLoading || !product || !product.images) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const handleAddToCart = async () => {
        await addToCart({ ...product, quantity });
        openModal();
    };

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        
        setZoomStyle({
            backgroundImage: `url(${images[selectedImage]})`,
            backgroundPosition: `${x}% ${y}%`,
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({});
    };

    const incrementQuantity = () => {
        if (quantity < (product?.stock || 0)) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Obtener todas las imágenes
    const images = product?.images || [];

    // Obtener imagen principal
    //const mainImage = product?.mainImage || images[0];

    // Calcular precio total
    const totalPrice = product ? product.price * quantity : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {productLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-4 text-gray-600">Cargando producto...</p>
                    </div>
                </div>
            ) : !product ? (
                <div className="alert alert-error max-w-md mx-auto mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Producto no encontrado</span>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <div className="breadcrumbs text-sm mb-8">
                        <ul>
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/products">Productos</a></li>
                            {product.category && <li><a href={`/category/${product.category}`}>{product.category}</a></li>}
                            <li className="font-semibold">{product.name}</li>
                        </ul>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sección de imágenes */}
                        <div className="lg:w-1/2">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Miniaturas */}
                                <div className="flex lg:flex-col order-2 lg:order-1 gap-2 overflow-x-auto lg:overflow-x-visible">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === index 
                                                ? 'border-primary ring-2 ring-primary/20' 
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Imagen principal con zoom */}
                                <div className="relative order-1 lg:order-2 flex-1">
                                    <div 
                                        className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img
                                            ref={imgRef}
                                            src={images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-auto max-h-[500px] object-contain cursor-zoom-in"
                                        />
                                        
                                        {/* Efecto de zoom */}
                                        <div 
                                            className={`absolute inset-0 bg-no-repeat bg-[length:200%] pointer-events-none transition-opacity duration-200 ${
                                                Object.keys(zoomStyle).length > 0 ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            style={zoomStyle}
                                        />
                                        
                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {product.isNewP && (
                                                <span className="badge badge-primary">Nuevo</span>
                                            )}
                                            {product.discount && (
                                                <span className="badge badge-accent">-{product.discount}%</span>
                                            )}
                                        </div>
                                        
                                        {/* Botones de acción sobre imagen */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className="btn btn-circle btn-sm bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                                                title={isFavorite ? 'Eliminar de lista de deseos' : 'Agregar a lista de deseos'}
                                            >
                                                <FaHeart className={`${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'} transition-colors`} />
                                            </button>
                                            <button className="btn btn-circle btn-sm bg-white/90 backdrop-blur-sm hover:bg-white">
                                                <FaShareAlt className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Indicador de imagen seleccionada */}
                                    <div className="flex justify-center mt-4">
                                        <div className="flex gap-2">
                                            {images.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full transition-all ${
                                                        selectedImage === index 
                                                        ? 'bg-primary w-4' 
                                                        : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección de información */}
                        <div className="lg:w-1/2">
                            <div className="space-y-6">
                                {/* Categorías */}
                                <div className="flex flex-wrap gap-2">
                                    {product.category && (
                                        <a 
                                            href={`/category/${product.category}`}
                                            className="badge badge-outline hover:badge-primary transition-colors"
                                        >
                                            {product.category}
                                        </a>
                                    )}
                                    {product.subcategory && (
                                        <span className="badge badge-outline">
                                            {product.subcategory}
                                        </span>
                                    )}
                                </div>

                                {/* Nombre y rating */}
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar 
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < (product.rating || 0) 
                                                        ? 'text-yellow-400 fill-yellow-400' 
                                                        : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                            <span className="ml-2 text-gray-600">
                                                ({product.reviewCount || 0} reseñas)
                                            </span>
                                        </div>
                                        <span className="text-success flex items-center gap-1">
                                            <FaCheck /> En stock
                                        </span>
                                    </div>
                                </div>

                                {/* Precio */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-bold text-primary">
                                            ${product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-2xl text-gray-400 line-through">
                                                ${product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    {product.discount && (
                                        <span className="badge badge-accent text-lg">
                                            Ahorras ${(product.originalPrice - product.price).toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div className="prose max-w-none">
                                    <h3 className="text-xl font-semibold mb-2">Descripción</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                    {product.features && (
                                        <ul className="mt-4 space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <FaCheck className="text-success" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Inventario */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Disponibilidad:</span>
                                        <span className={`font-bold ${product.stock > 10 ? 'text-success' : product.stock > 0 ? 'text-warning' : 'text-error'}`}>
                                            {product.stock > 10 
                                                ? 'En stock' 
                                                : product.stock > 0 
                                                    ? `Últimas ${product.stock} unidades` 
                                                    : 'Agotado'
                                            }
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-primary h-2 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: `${Math.min((product.stock / 100) * 100, 100)}%` 
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Solo quedan {product.stock} unidades
                                    </p>
                                </div>

                                {/* Cantidad y acciones */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">Cantidad:</span>
                                        <div className="join">
                                            <button 
                                                onClick={decrementQuantity}
                                                className="join-item btn btn-square"
                                                disabled={quantity <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <input 
                                                type="text" 
                                                value={quantity}
                                                readOnly
                                                className="join-item btn btn-square no-animation w-16 text-center"
                                            />
                                            <button 
                                                onClick={incrementQuantity}
                                                className="join-item btn btn-square"
                                                disabled={quantity >= product.stock}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <span className="text-gray-600">
                                            Máximo: {product.stock} unidades
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            className="btn btn-primary btn-lg flex-1 min-w-[200px]"
                                        >
                                            <FaShoppingCart className="mr-2" />
                                            Agregar al carrito (${totalPrice.toLocaleString()})
                                        </button>
                                        
                                        <button className="btn btn-outline btn-lg">
                                            Comprar ahora
                                        </button>
                                    </div>
                                </div>

                                {/* Garantías y servicios */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                                    <div className="flex items-center gap-2">
                                        <FaTruck className="text-xl text-primary" />
                                        <div>
                                            <p className="font-semibold">Envío gratis</p>
                                            <p className="text-sm text-gray-600">En compras +$50</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaUndo className="text-xl text-primary" />
                                        <div>
                                            <p className="font-semibold">30 días</p>
                                            <p className="text-sm text-gray-600">Devolución gratis</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="text-xl text-primary" />
                                        <div>
                                            <p className="font-semibold">Garantía</p>
                                            <p className="text-sm text-gray-600">2 años</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCheck className="text-xl text-primary" />
                                        <div>
                                            <p className="font-semibold">Original</p>
                                            <p className="text-sm text-gray-600">100% garantizado</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Compartir */}
                                <div className="pt-6 border-t">
                                    <p className="font-semibold mb-2">Compartir este producto:</p>
                                    <div className="flex gap-2">
                                        <button className="btn btn-circle btn-outline">
                                            <span className="text-blue-600">f</span>
                                        </button>
                                        <button className="btn btn-circle btn-outline">
                                            <span className="text-blue-400">t</span>
                                        </button>
                                        <button className="btn btn-circle btn-outline">
                                            <span className="text-pink-500">ig</span>
                                        </button>
                                        <button className="btn btn-circle btn-outline">
                                            <span className="text-green-500">w</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Productos relacionados (opcional) */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Aquí irían productos relacionados */}
                            <div className="text-center text-gray-500 py-8">
                                Cargando productos relacionados...
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailProduct
