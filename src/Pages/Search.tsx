// pages/Search.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router';
import CardProduct from '../Components/CardProduct/CardProduct';

interface SearchFilters {
    category: string;
    minPrice: string;
    maxPrice: string;
    inStock: boolean;
}

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const initialSearchTerm = params.get('name') || '';

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [filters, setFilters] = useState<SearchFilters>({
        category: '',
        minPrice: '',
        maxPrice: '',
        inStock: false
    });

    // Configuración de grid
    const gridConfig = {
        small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        medium: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
    };

    // Función para buscar productos
    const searchProducts = async () => {
        if (!searchTerm.trim() && !hasActiveFilters()) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Construir query parameters
            const queryParams = new URLSearchParams();
            
            if (searchTerm.trim()) {
                queryParams.append('name', searchTerm.trim());
            }
            
            // Añadir filtros si existen
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });

            // Realizar petición
            const response = await axios.get(`/api/search/products?${queryParams.toString()}`);
            
            // Manejar diferentes estructuras de respuesta
            let productsData: any[] = [];
            if (response.data?.data) {
                productsData = response.data.data;
            } else if (response.data?.products) {
                productsData = response.data.products;
            } else if (Array.isArray(response.data)) {
                productsData = response.data;
            }

            setProducts(productsData);
            
            // Actualizar URL sin recargar la página
            navigate(`/search?${queryParams.toString()}`, { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al buscar productos');
            console.error('Error en búsqueda:', err);
        } finally {
            setLoading(false);
        }
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = () => {
        return Object.values(filters).some(value => 
            (typeof value === 'string' && value.trim() !== '') || 
            (typeof value === 'boolean' && value)
        );
    };

    // Limpiar filtros
    const clearFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            inStock: false
        });
        if (searchTerm) {
            searchProducts();
        }
    };

    // Efecto para búsqueda inicial
    useEffect(() => {
        if (initialSearchTerm) {
            searchProducts();
        }
    }, []);

    // Efecto para actualizar searchTerm cuando cambia la URL
    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Cabecera de búsqueda */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {searchTerm ? `Resultados para: "${searchTerm}"` : 'Búsqueda de productos'}
                </h1>
                
                {/* Barra de búsqueda */}
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchProducts();
                    }}
                    className="max-w-2xl"
                >
                    <div className="join w-full">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="input input-bordered join-item w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-ghost join-item"
                            onClick={() => setShowFilters(!showFilters)}
                            title="Filtros"
                        >
                            <FiFilter className="text-lg" />
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary join-item"
                            disabled={!searchTerm.trim() && !hasActiveFilters()}
                        >
                            <FiSearch className="text-lg" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Filtros desplegables */}
            {showFilters && (
                <div className="bg-base-200 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Filtros de búsqueda</h3>
                        <button
                            onClick={clearFilters}
                            className="btn btn-xs btn-ghost"
                        >
                            <FiX /> Limpiar
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Categoría</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={filters.category}
                                onChange={(e) => setFilters({...filters, category: e.target.value})}
                            >
                                <option value="">Todas</option>
                                <option value="electronics">Electrónica</option>
                                <option value="clothing">Ropa</option>
                                <option value="books">Libros</option>
                                <option value="food">Alimentos</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="label">
                                <span className="label-text">Precio mínimo</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Mínimo"
                                className="input input-bordered w-full"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                            />
                        </div>
                        
                        <div>
                            <label className="label">
                                <span className="label-text">Precio máximo</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Máximo"
                                className="input input-bordered w-full"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-end">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary mr-2"
                                    checked={filters.inStock}
                                    onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                                />
                                <span className="label-text">Solo disponibles</span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={searchProducts}
                            className="btn btn-primary"
                        >
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            )}

            {/* Controles de vista */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <p className="text-gray-600">
                    {loading ? 'Buscando...' : `${products.length} productos encontrados`}
                </p>
                
                <div className="join">
                    <button 
                        onClick={() => setGridSize('small')} 
                        className={`join-item btn btn-sm ${gridSize === 'small' ? 'btn-primary' : 'btn-ghost'}`}
                        title="Vista compacta"
                    >
                        Compacta
                    </button>
                    <button 
                        onClick={() => setGridSize('medium')} 
                        className={`join-item btn btn-sm ${gridSize === 'medium' ? 'btn-primary' : 'btn-ghost'}`}
                        title="Vista normal"
                    >
                        Normal
                    </button>
                    <button 
                        onClick={() => setGridSize('large')} 
                        className={`join-item btn btn-sm ${gridSize === 'large' ? 'btn-primary' : 'btn-ghost'}`}
                        title="Vista ampliada"
                    >
                        Amplia
                    </button>
                </div>
            </div>

            {/* Estado de carga */}
            {loading && (
                <div className="flex flex-col justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                    <p className="text-gray-600">Buscando productos...</p>
                </div>
            )}

            {/* Estado de error */}
            {error && !loading && (
                <div className="alert alert-error max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Resultados vacíos */}
            {!loading && !error && products.length === 0 && (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {searchTerm || hasActiveFilters() 
                                ? 'No se encontraron productos' 
                                : 'Busca productos en nuestra tienda'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm 
                                ? `No hay resultados para "${searchTerm}". Intenta con otras palabras.`
                                : 'Ingresa un término de búsqueda para comenzar.'}
                        </p>
                        {hasActiveFilters() && (
                            <button
                                onClick={clearFilters}
                                className="btn btn-outline"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Grid de productos */}
            {!loading && !error && products.length > 0 && (
                <>
                    <div className={`grid ${gridConfig[gridSize]} gap-4 md:gap-6`}>
                        {products.map((product) => (
                            <CardProduct 
                                key={product._id} 
                                product={product}
                                size={gridSize}
                            />
                        ))}
                    </div>
                    
                    {/* Cargar más (opcional) */}
                    {products.length >= 10 && (
                        <div className="mt-12 text-center">
                            <button className="btn btn-outline btn-wide">
                                Ver más productos
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;