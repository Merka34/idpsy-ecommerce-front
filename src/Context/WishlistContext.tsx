import { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import { useUser } from './UserContext'
import {
    getWishlistService,
    addToWishlistService,
    removeFromWishlistService,
    isProductInWishlistService,
    clearWishlistService,
} from '../Services/wishlistServices'
import { toast } from 'react-hot-toast'

export const WishlistContext = createContext({})

export const WishlistContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [loading, setLoading] = useState(true)

    const {
        getUserId,
        isAuthenticated,
        loading: userLoading,
    } = useUser()

    // Cargar la lista de deseos cuando el usuario está autenticado
    const loadWishlist = async () => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                const response = await getWishlistService(userId)

                // Transformar los datos del backend al formato del frontend
                const wishlistItems =
                    response.wishlist?.products?.map((item) => ({
                        _id: item.productId?._id || item.productId,
                        ...item.productId,
                    })) || []

                setWishlist(wishlistItems)
                setItemsQuantity(wishlistItems.length)
            } catch (error) {
                console.error('Error al cargar la lista de deseos:', error)
                setWishlist([])
                setItemsQuantity(0)
            } finally {
                setLoading(false)
            }
        } else {
            setWishlist([])
            setItemsQuantity(0)
            setLoading(false)
        }
    }

    // Cargar la lista de deseos cuando el usuario se autentica
    useEffect(() => {
        if (!userLoading) {
            loadWishlist()
        }
    }, [isAuthenticated(), userLoading])

    // Agregar producto a la lista de deseos
    const addToWishlist = async (product) => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión para agregar a la lista de deseos')
            return
        }

        try {
            const userId = getUserId()
            const productId = product._id

            await addToWishlistService(userId, productId)

            // Actualizar estado local
            const isInWishlist = wishlist.some((item) => item._id === productId)
            if (!isInWishlist) {
                setWishlist([...wishlist, product])
                setItemsQuantity((prev) => prev + 1)
                toast.success('Producto agregado a la lista de deseos')
            } else {
                toast.info('El producto ya está en tu lista de deseos')
            }
        } catch (error) {
            toast.error(error.message || 'Error al agregar a la lista de deseos')
        }
    }

    // Eliminar producto de la lista de deseos
    const removeFromWishlist = async (productId) => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión')
            return
        }

        try {
            const userId = getUserId()
            await removeFromWishlistService(userId, productId)

            // Actualizar estado local
            const updatedWishlist = wishlist.filter((item) => item._id !== productId)
            setWishlist(updatedWishlist)
            setItemsQuantity(updatedWishlist.length)
            toast.success('Producto eliminado de la lista de deseos')
        } catch (error) {
            toast.error(
                error.message || 'Error al eliminar de la lista de deseos'
            )
        }
    }

    // Verificar si un producto está en la lista de deseos
    const isProductInWishlist = async (productId) => {
        if (!isAuthenticated()) {
            return false
        }

        try {
            const userId = getUserId()
            const response = await isProductInWishlistService(userId, productId)
            return response.isInWishlist
        } catch (error) {
            console.error('Error al verificar wishlist:', error)
            return false
        }
    }

    // Alternar producto en la lista de deseos
    const toggleWishlist = async (product) => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión para agregar a la lista de deseos')
            return
        }

        const isInWishlist = wishlist.some((item) => item._id === product._id)

        if (isInWishlist) {
            await removeFromWishlist(product._id)
        } else {
            await addToWishlist(product)
        }
    }

    // Limpiar la lista de deseos
    const clearWishlist = async () => {
        if (!isAuthenticated()) {
            return
        }

        try {
            const userId = getUserId()
            await clearWishlistService(userId)
            setWishlist([])
            setItemsQuantity(0)
            toast.success('Lista de deseos vaciada')
        } catch (error) {
            toast.error(error.message || 'Error al limpiar la lista de deseos')
        }
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                itemsQuantity,
                loading,
                addToWishlist,
                removeFromWishlist,
                isProductInWishlist,
                toggleWishlist,
                clearWishlist,
                loadWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist debe ser usado dentro de WishlistContextProvider')
    }
    return context
}
