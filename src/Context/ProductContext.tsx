import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = '/api/products'
export const ProductContext = createContext({})

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    // Función para obtener productos
    const getProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_URL)
            console.log(response)
            setProducts(response.data.data.products)
        } catch (error: any) {
            setError(error.message || 'Error al obtener los productos')
        } finally {
            setProductsLoading(false)
        }
    }, [])

    // Función para obtener un producto por id
    const getProductById = useCallback(async (id: string) => {
        setProductLoading(true)
        setProduct({})
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setProduct(response.data.data)
        } catch (error: any) {
            setError(error.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    // Funcion para actualizar un producto
    const updateProduct = useCallback(async (id: string, data: any) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
            category: data.category,
            discount: data.discount ?? 0,
            features: data.features,
            images: data.images,
            isNewP: data.isNewP,
            mainImage: data.mainImage,
            originalPrice: data.originalPrice,
            rating: data.rating,
            sku: data.sku,
            subcategory: data.subcategory,
            tags: data.tags,
            weight: data.weight ?? 0,
            active: data.active ?? true
        }

        try {
            const response = await axios.put(API_URL + `/${id}`, cleanData, {
                withCredentials: true,
            })

            if (response.status === 200) {
                // Actualizar el producto individual
                setProduct(response.data)
                // Actualizar el producto en la lista de productos
                setProducts((prevProducts) =>
                    prevProducts.map((p: any) => (p._id === id ? response.data : p)) as never
                )
                await getProducts();
                return {
                    success: true,
                    message: 'Producto actualizado correctamente',
                }
            }
        } catch (error: any) {
            setError(error.message || 'Error al actualizar el producto')
            return {
                success: false,
                message: 'Error al actualizar el producto',
            }
        } finally {
            setProductsLoading(false)
            setProductLoading(false)
        }
    }, [])

    // Funcion para crear un producto
    const createProduct = useCallback(async (data: any) => {
        console.log(data)
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
            category: data.category,
            discount: data.discount ?? 0,
            features: data.features,
            images: data.images,
            isNewP: data.isNewP,
            mainImage: data.mainImage,
            originalPrice: data.originalPrice,
            rating: data.rating,
            sku: data.sku,
            subcategory: data.subcategory,
            tags: data.tags,
            weight: data.weight ?? 0,
            active: data.active ?? true

        }

        try {
            const response = await axios.post(API_URL, cleanData, {
                withCredentials: true,
            })

            if (response.status === 201) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    response.data.product,
                ] as never)
                await getProducts();
                return {
                    success: true,
                    data: response.data,
                    message: response.data.message,
                }
            }
        } catch (error: any) {
            setError(error.message || 'Error al crear el producto')
            return {
                success: false,
                message: error.message || 'Error al crear el producto',
            }
        } finally {
            setProductLoading(false)
        }
    }, [])

    const deleteProduct = useCallback(async (id: string) => {
        try {
            const response = await axios.delete(API_URL + `/${id}`, {
                withCredentials: true,
            })

            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((p: any) => p._id !== id)
                )

                return {
                    success: true,
                    message: 'Producto eliminado correctamente',
                }
            }
        } catch (error: any) {
            setError(error.message || 'Error al eliminar el prducto')
            return {
                success: false,
                message: 'Error al eliminar el producto',
            }
        } finally {
            setProductsLoading(false)
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        product,
        products,
        productsLoading,
        productLoading,
        error,
        getProducts,
        getProductById,
        updateProduct,
        createProduct,
        deleteProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

// Hook personalizado
export const useProduct = () => useContext(ProductContext)
