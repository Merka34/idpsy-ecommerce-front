/*import UpdateProductForm from '../Components/AdminDashboard/UpdateProductForm/UpdateProductForm'
import { useParams } from 'react-router'
import { useProduct } from '../Context/ProductContext'
import { useEffect } from 'react'

const UpdateProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">
                Actualizar producto
            </h1>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <UpdateProductForm product={product} />
            )}
        </div>
    )
}

export default UpdateProduct*/

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../Context/ProductContext';
import UpdateProductForm from '../Components/AdminDashboard/UpdateProductForm/UpdateProductForm';
import { FaArrowLeft, FaEdit, FaEye } from 'react-icons/fa';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById, product, productLoading, error } = useProduct();
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

    useEffect(() => {
        if (id) {
            getProductById(id);
        }
    }, [id, getProductById]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/dashboard/products')}
                                className="btn btn-ghost btn-circle"
                                title="Volver"
                            >
                                <FaArrowLeft />
                            </button>
                            {
                                productLoading ? <div></div> 
                                :
                                <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {product?.name || 'Actualizar Producto'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    ID: {id}
                                </p>
                                </div>
                            }
                            
                        </div>

                        {/* Modo de vista */}
                        <div className="join">
                            <button
                                className={`join-item btn ${viewMode === 'edit' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setViewMode('edit')}
                            >
                                <FaEdit className="mr-2" />
                                Editar
                            </button>
                            <button
                                className={`join-item btn ${viewMode === 'preview' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setViewMode('preview')}
                            >
                                <FaEye className="mr-2" />
                                Vista Previa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="container mx-auto px-4 py-8">
                {productLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                            <p className="mt-4 text-gray-600">Cargando producto...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-error max-w-md mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error al cargar el producto: {error.message}</span>
                    </div>
                ) : !product ? (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Producto no encontrado</h3>
                            <p className="mt-1 text-gray-500">El producto que buscas no existe o fue eliminado.</p>
                            <button
                                onClick={() => navigate('/admin/dashboard/products')}
                                className="btn btn-primary mt-4"
                            >
                                Volver a Productos
                            </button>
                        </div>
                    </div>
                ) : viewMode === 'preview' ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Vista previa del producto */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-6">Vista Previa del Producto</h2>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Imágenes */}
                                    <div>
                                        <h3 className="font-semibold mb-4">Imágenes ({product.images?.length || 0})</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {product.images?.map((img, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={img}
                                                        alt={`Producto ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    {img === product.mainImage && (
                                                        <div className="absolute top-1 right-1">
                                                            <span className="badge badge-primary badge-xs">Principal</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Información */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">Información Básica</h3>
                                            <p><strong>Nombre:</strong> {product.name}</p>
                                            <p><strong>SKU:</strong> {product.sku || 'No asignado'}</p>
                                            <p><strong>Precio:</strong> ${product.price?.toLocaleString()}</p>
                                            {product.originalPrice && (
                                                <p><strong>Precio Original:</strong> ${product.originalPrice.toLocaleString()}</p>
                                            )}
                                            <p><strong>Stock:</strong> {product.stock} unidades</p>
                                        </div>

                                        {product.category && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Categorías</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="badge badge-outline">{product.category}</span>
                                                    {product.subcategory && (
                                                        <span className="badge badge-outline">{product.subcategory}</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {product.tags?.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Etiquetas</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.tags.map((tag, index) => (
                                                        <span key={index} className="badge badge-outline">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Características */}
                                {product.features?.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-2">Características</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {product.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Descripción */}
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">Descripción</h3>
                                    <p className="text-gray-700">{product.description}</p>
                                </div>

                                {/* Botón para editar */}
                                <div className="card-actions justify-end mt-6">
                                    <button
                                        onClick={() => setViewMode('edit')}
                                        className="btn btn-primary"
                                    >
                                        <FaEdit className="mr-2" />
                                        Editar Producto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <UpdateProductForm product={product} />
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;