import { useState, useEffect } from 'react'
import { useCategory } from '../Context/CategoryContext'
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

const AdminCategories = () => {
    const {
        categories,
        loading,
        createCategory,
        updateCategory,
        deleteCategory,
        loadCategories,
    } = useCategory()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#3b82f6',
        image: '',
    })
    const [searchTerm, setSearchTerm] = useState('')

    // Filtrar categorías por búsqueda
    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Abrir modal para crear
    const handleOpenCreateModal = () => {
        setFormData({
            name: '',
            description: '',
            color: '#3b82f6',
            image: '',
        })
        setEditingId(null)
        setIsModalOpen(true)
    }

    // Abrir modal para editar
    const handleOpenEditModal = (category) => {
        setFormData({
            name: category.name,
            description: category.description,
            color: category.color,
            image: category.image || '',
        })
        setEditingId(category._id)
        setIsModalOpen(true)
    }

    // Cerrar modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingId(null)
        setFormData({
            name: '',
            description: '',
            color: '#3b82f6',
            image: '',
        })
        loadCategories()
    }

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Guardar categoría (crear o actualizar)
    const handleSaveCategory = async (e) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            toast.error('El nombre de la categoría es requerido')
            return
        }

        try {
            if (editingId) {
                await updateCategory(editingId, formData)
            } else {
                await createCategory(formData)
            }
            handleCloseModal()
        } catch (error) {
            console.error('Error al guardar categoría:', error)
        }
    }

    // Eliminar categoría
    const handleDeleteCategory = async (id) => {
        if (
            window.confirm(
                '¿Estás seguro de que deseas eliminar esta categoría?'
            )
        ) {
            try {
                await deleteCategory(id)
            } catch (error) {
                console.error('Error al eliminar categoría:', error)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Gestión de Categorías
                        </h1>
                        <p className="text-gray-600">
                            Crea, edita y elimina categorías de productos
                        </p>
                    </div>
                    <button
                        onClick={handleOpenCreateModal}
                        className="btn btn-primary gap-2"
                    >
                        <FaPlus /> Nueva Categoría
                    </button>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Buscar categorías..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Tabla de categorías */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {filteredCategories.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 text-lg">
                                No hay categorías
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Color
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Nombre
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Descripción
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((category) => (
                                        <tr
                                            key={category._id}
                                            className="border-b hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div
                                                    className="w-10 h-10 rounded-lg border-2 border-gray-300"
                                                    style={{
                                                        backgroundColor:
                                                            category.color,
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900">
                                                    {category.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="truncate block">
                                                    {category.description ||
                                                        'Sin descripción'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {category.isActive ? (
                                                    <span className="badge badge-success gap-1">
                                                        <FaCheck /> Activa
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-error gap-1">
                                                        <FaTimes /> Inactiva
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenEditModal(
                                                                category
                                                            )
                                                        }
                                                        className="btn btn-sm btn-warning"
                                                        title="Editar"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteCategory(
                                                                category._id
                                                            )
                                                        }
                                                        className="btn btn-sm btn-error"
                                                        title="Eliminar"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {editingId
                                        ? 'Editar Categoría'
                                        : 'Nueva Categoría'}
                                </h2>

                                <form
                                    onSubmit={handleSaveCategory}
                                    className="space-y-4"
                                >
                                    {/* Nombre */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Nombre *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Llaveros"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    {/* Descripción */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Descripción
                                            </span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Descripción de la categoría"
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                        />
                                    </div>

                                    {/* Color */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Color
                                            </span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                name="color"
                                                value={formData.color}
                                                onChange={handleInputChange}
                                                className="input input-bordered flex-1 h-10"
                                            />
                                            <div
                                                className="w-10 h-10 rounded-lg border-2 border-gray-300"
                                                style={{
                                                    backgroundColor:
                                                        formData.color,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Imagen URL */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                URL de Imagen
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Botones */}
                                    <div className="flex gap-2 pt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary flex-1"
                                        >
                                            {editingId ? 'Actualizar' : 'Crear'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="btn btn-ghost flex-1"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminCategories
