import axios from 'axios'

const API_URL = '/api/categories'

axios.defaults.withCredentials = true

// Obtener todas las categorías
export const getAllCategoriesService = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al obtener categorías'
        )
    }
}

// Obtener categorías activas
export const getActiveCategoriesService = async () => {
    try {
        const response = await axios.get(`${API_URL}/active`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al obtener categorías'
        )
    }
}

// Obtener categoría por ID
export const getCategoryByIdService = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al obtener categoría'
        )
    }
}

// Obtener categoría por slug
export const getCategoryBySlugService = async (slug: string) => {
    try {
        const response = await axios.get(`${API_URL}/slug/${slug}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al obtener categoría'
        )
    }
}

// Buscar categorías
export const searchCategoriesService = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query },
        })
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al buscar categorías'
        )
    }
}

// Crear categoría
export const createCategoryService = async (categoryData: {
    name: string
    description?: string
    color?: string
    image?: string
}) => {
    try {
        const response = await axios.post(`${API_URL}/create`, categoryData)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al crear categoría'
        )
    }
}

// Actualizar categoría
export const updateCategoryService = async (
    id: string,
    categoryData: {
        name?: string
        description?: string
        color?: string
        image?: string | null
        isActive?: boolean
    }
) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, categoryData)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al actualizar categoría'
        )
    }
}

// Eliminar categoría
export const deleteCategoryService = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'Error al eliminar categoría'
        )
    }
}
