import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa'
import CardProduct from '../Components/CardProduct/CardProduct'
import { useCategory } from '../Context/CategoryContext'

interface SearchFilters {
    minPrice: string
    maxPrice: string
    inStock: boolean
}

const CategorySearch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { activeCategories, loadActiveCategories } = useCategory()

    const params = new URLSearchParams(location.search)
    const categoryId = params.get('id') || ''
    const categoryName = params.get('name') || ''

    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>(
        'medium'
    )
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<SearchFilters>({
        minPrice: '',
        maxPrice: '',
        inStock: false,
    })
    const [selectedCategory, setSelectedCategory] = useState<any>(null)

    const gridConfig = {
        small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        medium: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
    }

    // Cargar categoría seleccionada
    useEffect(() => {
        if (categoryId && activeCategories.length > 0) {
            const category = activeCategories.find(
                (cat) => cat._id === categoryId
            )
            setSelectedCategory(category)
        }
    }, [categoryId, activeCategories])

    // Buscar productos de la categoría
    const searchByCategory = async () => {
        if (!categoryId) {
            setProducts([])
            return
        }

        setLoading(true)
        setError(null)

        try {
            const queryParams = new URLSearchParams()
            queryParams.append('category', categoryId)

            if (filters.minPrice) {
                queryParams.append('minPrice', filters.minPrice)
            }
            if (filters.maxPrice) {
                queryParams.append('maxPrice', filters.maxPrice)
            }
            if (filters.inStock) {
                queryParams.append('inStock', 'true')
            }

            const response = await axios.get(
                `/api/search/products?${queryParams.toString()}`
            )

            let productsData: any[] = []
            if (response.data?.data) {
                productsData = response.data.data
            } else if (response.data?.products) {
                productsData = response.data.products
            } else if (Array.isArray(response.data)) {
                productsData = response.data
            }

            setProducts(productsData)
        } catch (err) {
            console.error('Error al buscar productos:', err)
            setError('Error al buscar productos en esta categoría')
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    // Buscar cuando cambia la categoría o los filtros
    useEffect(() => {
        searchByCategory()
    }, [categoryId, filters])

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }))
    }

    const handleClearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            inStock: false,
        })
    }

    const hasActiveFilters = () => {
        return filters.minPrice || filters.maxPrice || filters.inStock
    }

    if (!categoryId) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="alert alert-warning">
                        <FaSearch className="text-lg" />
                        <span>Selecciona una categoría para buscar productos</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Encabezado de categoría */}
                {selectedCategory && (
                    <div className="mb-8">
                        <div
                            className="rounded-lg p-6 text-white shadow-lg"
                            style={{
                                backgroundColor: selectedCategory.color,
                            }}
                        >
                            <h1 className="text-4xl font-bold mb-2">
                                {selectedCategory.name}
                            </h1>
                            <p className="text-lg opacity-90">
                                {selectedCategory.description ||
                                    'Explora nuestros productos en esta categoría'}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Panel de filtros (Sidebar) */}
                    <div className="lg:w-64">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-outline w-full lg:hidden mb-4 gap-2"
                        >
                            <FaFilter /> Filtros
                        </button>

                        <div
                            className={`${
                                showFilters ? 'block' : 'hidden lg:block'
                            } bg-white rounded-lg shadow p-6 space-y-6`}
                        >
                            <h3 className="text-xl font-bold">Filtros</h3>

                            {/* Filtro de precio */}
                            <div className="space-y-3">
                                <h4 className="font-semibold">Rango de Precio</h4>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Mínimo</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="$0"
                                        value={filters.minPrice}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'minPrice',
                                                e.target.value
                                            )
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Máximo</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="$99999"
                                        value={filters.maxPrice}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'maxPrice',
                                                e.target.value
                                            )
                                        }
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            {/* Filtro de disponibilidad */}
                            <div className="space-y-3">
                                <h4 className="font-semibold">Disponibilidad</h4>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.inStock}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'inStock',
                                                e.target.checked
                                            )
                                        }
                                        className="checkbox"
                                    />
                                    <span>En stock</span>
                                </label>
                            </div>

                            {/* Botón de limpiar filtros */}
                            {hasActiveFilters() && (
                                <button
                                    onClick={handleClearFilters}
                                    className="btn btn-ghost w-full gap-2"
                                >
                                    <FaTimes /> Limpiar filtros
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Área de productos */}
                    <div className="flex-1">
                        {/* Controles de visualización */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-semibold text-gray-900">
                                        {products.length}
                                    </span>{' '}
                                    productos encontrados
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setGridSize('small')}
                                    className={`btn btn-sm ${
                                        gridSize === 'small'
                                            ? 'btn-primary'
                                            : 'btn-ghost'
                                    }`}
                                >
                                    👁️ Pequeño
                                </button>
                                <button
                                    onClick={() => setGridSize('medium')}
                                    className={`btn btn-sm ${
                                        gridSize === 'medium'
                                            ? 'btn-primary'
                                            : 'btn-ghost'
                                    }`}
                                >
                                    👁️ Medio
                                </button>
                                <button
                                    onClick={() => setGridSize('large')}
                                    className={`btn btn-sm ${
                                        gridSize === 'large'
                                            ? 'btn-primary'
                                            : 'btn-ghost'
                                    }`}
                                >
                                    👁️ Grande
                                </button>
                            </div>
                        </div>

                        {/* Estado de carga */}
                        {loading && (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                            </div>
                        )}

                        {/* Error */}
                        {error && !loading && (
                            <div className="alert alert-error mb-6">
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Sin resultados */}
                        {!loading && products.length === 0 && !error && (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-500 mb-4">
                                    No hay productos en esta categoría
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="btn btn-primary"
                                >
                                    Volver al inicio
                                </button>
                            </div>
                        )}

                        {/* Grid de productos */}
                        {!loading && products.length > 0 && (
                            <div
                                className={`grid ${gridConfig[gridSize]} gap-4 auto-rows-max`}
                            >
                                {products.map((product) => (
                                    <CardProduct
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategorySearch
