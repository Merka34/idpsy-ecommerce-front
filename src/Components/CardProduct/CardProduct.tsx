import { Link } from 'react-router'
import { useUser } from '../../Context/UserContext'
import { useCart } from '../../Context/CartContext'
import { FaEye, FaShoppingCart, FaStar } from 'react-icons/fa'

interface CardProductProps {
    product: {
        _id: string;
        name: string;
        price: number;
        description: string;
        images: string[];
        stock: number;
        rating?: number;
        category?: string;
    };
    size?: 'small' | 'medium' | 'large';
}

const CardProduct = ({ product, size = 'medium' }: CardProductProps) => {
    const { _id, name, price, description, images, stock, rating, category } = product;
    
    const cardConfig = {
        small: {
            container: 'card card-compact bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300',
            image: 'aspect-square object-cover',
            title: 'text-sm font-semibold line-clamp-1',
            description: 'text-xs line-clamp-2 text-gray-600',
            price: 'text-md font-bold text-primary',
            actions: 'btn-xs'
        },
        medium: {
            container: 'card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
            image: 'aspect-[4/3] object-cover',
            title: 'text-lg font-bold line-clamp-1',
            description: 'text-sm line-clamp-2 text-gray-600',
            price: 'text-xl font-bold text-primary',
            actions: 'btn-sm'
        },
        large: {
            container: 'card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            image: 'aspect-[3/2] object-cover',
            title: 'text-xl font-bold line-clamp-1',
            description: 'text-base line-clamp-3 text-gray-600',
            price: 'text-2xl font-bold text-primary',
            actions: 'btn-md'
        }
    };
    
    const { addToCart, loading, openModal } = useCart()
    const handleAddToCart = async () => {
        await addToCart({ _id, name, price, images, description, stock })
        openModal() // Abrir el modal del carrito despues de agregar el producto
    }

    const config = cardConfig[size];

    return (
        <div className={config.container}>
            {/* Badge de categoría */}
            {category && (
                <div className="absolute top-2 left-2 z-10">
                    <span className="badge badge-primary badge-sm">
                        {category}
                    </span>
                </div>
            )}
            
            {/* Badge de stock bajo */}
            {stock > 0 && stock <= 5 && (
                <div className="absolute top-2 right-2 z-10">
                    <span className="badge badge-warning badge-sm">
                        Últimas {stock} unidades
                    </span>
                </div>
            )}
            
            {/* Imagen del producto */}
            <figure className="relative overflow-hidden">
                <Link to={`/product/${_id}`} className="block">
                    <img
                        className={`${config.image} w-full transition-transform duration-500 hover:scale-105`}
                        src={images[0]}
                        alt={name}
                        loading="lazy"
                    />
                </Link>
                
                {/* Rating overlay */}
                {/*rating && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
                    </div>
                )*/}
            </figure>
            
            {/* Contenido de la tarjeta */}
            <div className="card-body p-4">
                <Link to={`/product/${_id}`} className="hover:no-underline">
                    <div className="space-y-2">
                        <h3 className={config.title}>
                            {name}
                        </h3>
                        
                        {size !== 'small' && (
                            <p className={config.description}>
                                {description}
                            </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                            <span className={config.price}>
                                ${price.toLocaleString()}
                            </span>
                            
                            {stock === 0 && (
                                <span className="badge badge-error">
                                    Agotado
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
                
                {/* Acciones */}
                <div className="card-actions justify-between mt-4 pt-4 border-t">
                    <Link
                        to={`/product/${_id}`}
                        className={`btn btn-outline ${config.actions} flex-1`}
                    >
                        <FaEye className="mr-2" />
                        {size !== 'small' && 'Ver'}
                    </Link>
                    
                    <button
                        onClick={() => {handleAddToCart}}
                        disabled={stock === 0}
                        className={`btn btn-primary ${config.actions} flex-1 ${
                            stock === 0 ? 'btn-disabled' : ''
                        }`}
                    >
                        <FaShoppingCart className="mr-2" />
                        {size !== 'small' && (stock === 0 ? 'Agotado' : 'Agregar')}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CardProduct
