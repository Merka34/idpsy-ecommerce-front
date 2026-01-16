import axios from 'axios'

// Configuración base de axios para la lista de deseos
const API_URL = '/api/wishlist'

// Configurar axios para incluir cookies en las peticiones
axios.defaults.withCredentials = true

// Servicio para obtener la lista de deseos del usuario
export const getWishlistService = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/get/${userId}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al obtener la lista de deseos'
        )
    }
}

// Servicio para agregar producto a la lista de deseos
export const addToWishlistService = async (userId: string, productId: string) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            userId,
            productId,
        })
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
                'Error al agregar producto a la lista de deseos'
        )
    }
}

// Servicio para eliminar producto de la lista de deseos
export const removeFromWishlistService = async (userId: string, productId: string) => {
    try {
        const response = await axios.delete(
            `${API_URL}/remove/${userId}`,
            {
                data: { productId },
            }
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
                'Error al eliminar producto de la lista de deseos'
        )
    }
}

// Servicio para verificar si un producto está en la lista de deseos
export const isProductInWishlistService = async (userId: string, productId: string) => {
    try {
        const response = await axios.get(`${API_URL}/check`, {
            params: {
                userId,
                productId,
            },
        })
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al verificar la lista de deseos'
        )
    }
}

// Servicio para limpiar la lista de deseos
export const clearWishlistService = async (userId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/clear/${userId}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al limpiar la lista de deseos'
        )
    }
}
