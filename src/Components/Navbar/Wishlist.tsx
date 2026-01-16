import { useState } from 'react'
import { useWishlist } from '../../Context/WishlistContext'
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../Context/CartContext'
import { useUser } from '../../Context/UserContext'

const Wishlist = () => {
    const { wishlist, itemsQuantity, removeFromWishlist, loading } = useWishlist()
    const { addToCart, openModal } = useCart()
    const { isAuthenticated } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 })
        openModal()
    }

    const handleRemoveFromWishlist = async (productId) => {
        await removeFromWishlist(productId)
    }

    if (!isAuthenticated()) {
        return null
    }

    return (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-circle btn-outline"
                    onClick={() => setIsOpen(!isOpen)}
                    title="Lista de deseos"
                >
                    <div className="indicator">
                        <FaHeart className="h-5 w-5 text-red-500" />
                        {itemsQuantity > 0 && (
                            <span className="badge badge-sm indicator-item badge-primary">
                                {itemsQuantity}
                            </span>
                        )}
                    </div>
                </div>

                {isOpen && (
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1000] mt-3 w-80 shadow-lg rounded-xl"
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-lg font-bold flex items-center gap-2">
                                        <FaHeart className="text-red-500" />
                                        Mi lista de deseos
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {itemsQuantity} {itemsQuantity === 1 ? 'producto' : 'productos'}
                                    </span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <span className="loading loading-spinner loading-sm"></span>
                                </div>
                            ) : wishlist.length === 0 ? (
                                <div className="text-center py-6">
                                    <FaHeart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                                    <p className="text-gray-500">
                                        Tu lista de deseos está vacía
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Agrega productos que te interesen
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                    {wishlist.map((product) => (
                                        <div
                                            key={product._id}
                                            className="flex gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-16 h-16 flex-shrink-0">
                                                <img
                                                    src={
                                                        product.images?.[0] ||
                                                        '/placeholder.png'
                                                    }
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 truncate">
                                                    {product.name}
                                                </h4>
                                                <p className="text-primary font-bold">
                                                    ${product.price?.toLocaleString()}
                                                </p>
                                                <div className="flex gap-1 mt-1">
                                                    <button
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                product
                                                            )
                                                        }
                                                        className="btn btn-xs btn-primary gap-1"
                                                        title="Agregar al carrito"
                                                    >
                                                        <FaShoppingCart className="h-3 w-3" />
                                                        Carrito
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveFromWishlist(
                                                                product._id
                                                            )
                                                        }
                                                        className="btn btn-xs btn-ghost gap-1"
                                                        title="Eliminar"
                                                    >
                                                        <FaTrash className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {wishlist.length > 0 && (
                                <div className="card-actions mt-4 pt-4 border-t">
                                    <button className="btn btn-primary btn-block btn-sm">
                                        Ver lista de deseos completa
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
