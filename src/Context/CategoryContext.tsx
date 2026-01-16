import { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import {
    getAllCategoriesService,
    getActiveCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
} from '../Services/categoryServices'
import { toast } from 'react-hot-toast'

export const CategoryContext = createContext({})

export const CategoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const [activeCategories, setActiveCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // Cargar todas las categorías
    const loadCategories = async () => {
        try {
            setLoading(true)
            const response = await getAllCategoriesService()
            setCategories(response.categories)
        } catch (error) {
            console.error('Error al cargar categorías:', error)
            toast.error(error.message || 'Error al cargar categorías')
            setCategories([])
        } finally {
            setLoading(false)
        }
    }

    // Cargar categorías activas
    const loadActiveCategories = async () => {
        try {
            const response = await getActiveCategoriesService()
            setActiveCategories(response.categories)
        } catch (error) {
            console.error('Error al cargar categorías activas:', error)
            setActiveCategories([])
        }
    }

    // Efecto inicial para cargar categorías
    useEffect(() => {
        loadCategories()
        loadActiveCategories()
    }, [])

    // Crear categoría
    const createCategory = async (categoryData) => {
        try {
            const response = await createCategoryService(categoryData)
            setCategories([response.category, ...categories])
            setActiveCategories([response.category, ...activeCategories])
            toast.success('Categoría creada con éxito')
            return response.category
        } catch (error) {
            console.error('Error al crear categoría:', error)
            toast.error(error.message || 'Error al crear categoría')
            throw error
        }
    }

    // Actualizar categoría
    const updateCategory = async (id, categoryData) => {
        try {
            const response = await updateCategoryService(id, categoryData)
            const updatedCategories = categories.map((cat) =>
                cat._id === id ? response.category : cat
            )
            setCategories(updatedCategories)

            const updatedActiveCategories = activeCategories.map((cat) =>
                cat._id === id ? response.category : cat
            )
            setActiveCategories(updatedActiveCategories)

            toast.success('Categoría actualizada con éxito')
            return response.category
        } catch (error) {
            console.error('Error al actualizar categoría:', error)
            toast.error(error.message || 'Error al actualizar categoría')
            throw error
        }
    }

    // Eliminar categoría
    const deleteCategory = async (id) => {
        try {
            await deleteCategoryService(id)
            setCategories(categories.filter((cat) => cat._id !== id))
            setActiveCategories(activeCategories.filter((cat) => cat._id !== id))
            toast.success('Categoría eliminada con éxito')
        } catch (error) {
            console.error('Error al eliminar categoría:', error)
            toast.error(error.message || 'Error al eliminar categoría')
            throw error
        }
    }

    return (
        <CategoryContext.Provider
            value={{
                categories,
                activeCategories,
                loading,
                loadCategories,
                loadActiveCategories,
                createCategory,
                updateCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

// Hook personalizado
export const useCategory = () => {
    const context = useContext(CategoryContext)
    if (!context) {
        throw new Error(
            'useCategory debe ser usado dentro de CategoryContextProvider'
        )
    }
    return context
}
