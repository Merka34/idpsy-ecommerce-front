import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaUpload, FaLink, FaImage, FaTrash, FaPlus, FaMinus, FaTag, FaStar, FaDollarSign, FaBox, FaLayerGroup } from 'react-icons/fa';
import { useProduct } from '../../../Context/ProductContext';
import { useNavigate } from 'react-router';
import { useUpload } from '../../../Hooks/useUpload';
// Definir tipos
interface ProductImage {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
}

const CreateProductForm = () => {
    const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [features, setFeatures] = useState<string[]>(['']);
    const [tags, setTags] = useState<string[]>(['']);
    const [imagesFile, setImagesFile] = useState<(ProductImage & { file?: File })[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            originalPrice: undefined,
            stock: 0,
            images: [''],
            mainImage: 0,
            category: '',
            subcategory: '',
            rating: 0,
            features: [''],
            isNewP: false,
            discount: undefined,
            tags: [''],
            sku: '',
            weight: undefined,
            dimensions: {
                height: undefined,
                width: undefined,
                depth: undefined,
            }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'images'
    });

    const { createProduct, updateProduct, deleteProduct } = useProduct();
    const { uploadImages: uploadToServer } = useUpload();
    const navigate = useNavigate();

    // Observar cambios en el campo de imágenes para actualizar preview
    const watchImages = watch('images');

    // Actualizar preview cuando cambian las imágenes
    useEffect(() => {
        const validImages = watchImages.filter(img => img.trim() !== '');
        setPreviewImages(validImages);
        
        // Si hay imágenes y no hay imagen principal, establecer la primera
        if (validImages.length > 0 && !watch('mainImage')) {
            setValue('mainImage', validImages[0]);
        }
    }, [watchImages, watch, setValue]);

    // Manejar subida de archivos
    const handleFileUpload = async (files: FileList) => {
        setUploading(true);
        try {
            const newImagesFile = Array.from(files).map(file => {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`La imagen ${file.name} es muy grande (máx 5MB)`);
                    return null;
                }
                
                return {
                    file: file,
                    url: URL.createObjectURL(file),
                    filename: `${Date.now()}-${file.name}`,
                    originalName: file.name,
                    size: file.size,
                    mimetype: file.type,
                    isBlob: true
                };
            }).filter(Boolean) as (ProductImage & { file?: File })[];

            // Actualizar el estado de imagesFile
            const combinedFiles = [...imagesFile, ...newImagesFile];
            setImagesFile(combinedFiles);
            
            // Actualizar el campo images del formulario con las URLs blob
            const currentImages = watch('images') || [];
            const newImageUrls = newImagesFile.map(img => img.url);
            const allImages = [...currentImages.filter(img => img.trim() !== ''), ...newImageUrls];
            
            setValue('images', allImages);
            setPreviewImages(allImages);
            
            toast.success(`${newImagesFile.length} imagen(es) cargada(s) exitosamente`);
            
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('Error al cargar las imágenes');
        } finally {
            setUploading(false);
        }
    };

    // Manejar drop de archivos
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        
        // Filtrar solo imágenes
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length > 0) {
            handleFileUpload(imageFiles as any);
        }
    };

    // Manejar click en input de archivo
    const handleFileInputClick = () => {
        document.getElementById('file-upload')?.click();
    };

    // Agregar nueva imagen URL
    const addImageUrl = () => {
        append('');
    };

    // Eliminar imagen
    const removeImage = (index: number) => {
        // Si es la imagen principal, resetear
        if (watch('mainImage') === watchImages[index]) {
            setValue('mainImage', 0);
        }
        remove(index);
    };

    // Establecer como imagen principal
    const setAsMainImage = (index: number) => {
        setValue('mainImage', watchImages[index]);
        toast.success('Imagen principal establecida');
    };

    // Agregar característica
    const addFeature = () => {
        setFeatures([...features, '']);
    };

    // Actualizar característica
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
        setValue('features', newFeatures.filter(f => f.trim() !== ''));
    };

    // Eliminar característica
    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
        setValue('features', newFeatures);
    };

    // Agregar tag
    const addTag = () => {
        setTags([...tags, '']);
    };

    // Actualizar tag
    const updateTag = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
        setValue('tags', newTags.filter(t => t.trim() !== ''));
    };

    // Eliminar tag
    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        setValue('tags', newTags);
    };

    // Calcular descuento automáticamente
    const calculateDiscount = () => {
        const price = watch('price');
        const originalPrice = watch('originalPrice');
        
        if (originalPrice && originalPrice > price) {
            const discount = ((originalPrice - price) / originalPrice) * 100;
            setValue('discount', Math.round(discount));
        } else {
            setValue('discount', undefined);
        }
    };

    // Generar SKU automáticamente
    const generateSku = () => {
        const name = watch('name');
        if (name.length >= 3) {
            const prefix = name.substring(0, 3).toUpperCase();
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            setValue('sku', `${prefix}-${randomNum}`);
        }
    };

    const onSubmit = async (data: any) => {
    // Validar que haya imágenes
    if(typeof data.mainImage === 'string')
        data.mainImage = 0

    const hasImages = imagesFile.length > 0 || (watchImages && watchImages.some(img => img?.trim() && !img.startsWith('blob:')));
    
    if (!hasImages) {
        toast.error('Debes agregar al menos una imagen');
        return;
    }

    setUploading(true);
    
    try {
        // 1. Crear producto sin imágenes para obtener ID
        const initialProductData = {
            ...data,
            images: [],
            features: data.features.filter((f: string) => f.trim() !== ''),
            tags: data.tags.filter((t: string) => t.trim() !== ''),
        };

        const createResult = await createProduct(initialProductData);
        if (!createResult.success) {
            toast.error(createResult.message);
            return;
        }
        const productId = createResult.data.data._id;
        let imageUrls: string[] = [];
        
        // 2. Procesar imágenes cargadas por archivo
        const fileImages = imagesFile.filter(img => (img as any).file);
        if (fileImages.length > 0) {
            const files = fileImages.map(b => (b as any).file);
            const uploadedResults = await uploadToServer(files, productId);
            imageUrls = uploadedResults.map((result: any) => result.url);
        }
        
        // 3. Procesar URLs directas (imágenes por URL) - solo las que no son blob
        const urlImages = watchImages.filter(img => img?.trim() && !img.startsWith('blob:'));
        if (urlImages.length > 0) {
            imageUrls = [...imageUrls, ...urlImages];
        }
        
        // 4. Si hay imágenes, actualizar el producto
        if (imageUrls.length > 0) {
            const updateData = {
                name: createResult.data.data.name,
                description: createResult.data.data.description,
                discount: createResult.data.data.discount,
                originalPrice: createResult.data.data.originalPrice,
                price: createResult.data.data.price,
                stock:createResult.data.data.stock,
                tags: createResult.data.data.tags,
                images: imageUrls,
                mainImage: imageUrls[0] || 0,
            };
            
            if (typeof updateData.mainImage === 'string')
                updateData.mainImage = (imageUrls.indexOf(updateData.mainImage) !== -1 ? imageUrls.indexOf(updateData.mainImage) : 0)

            const updateResult = await updateProduct(productId, updateData);
            
            if (!updateResult.success) {
                toast.error('Error al actualizar imágenes del producto');
                await deleteProduct(productId);
                return;
            }
        }
        
        toast.success('Producto creado exitosamente');
        reset();
        setImagesFile([]);
        navigate('/admin/dashboard/products');
        
    } catch (error) {
        toast.error('Error al crear el producto');
        console.error(error);
    } finally {
        setUploading(false);
    }
};

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Producto</h1>
                <p className="text-gray-600 mt-2">Complete todos los campos para agregar un nuevo producto</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Sección 1: Información Básica */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl flex items-center gap-2">
                            <FaBox /> Información Básica
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Nombre del Producto *</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo 100 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.name ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Ej: Smartphone XYZ Pro"
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* SKU */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">SKU</span>
                                    <button
                                        type="button"
                                        onClick={generateSku}
                                        className="btn btn-xs btn-outline"
                                    >
                                        Generar
                                    </button>
                                </label>
                                <input
                                    {...register('sku', {
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.sku ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Ej: PRO-1234"
                                />
                                {errors.sku && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.sku.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="md:col-span-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Descripción *</span>
                                    </label>
                                    <textarea
                                        {...register('description', {
                                            required: 'La descripción es requerida',
                                            minLength: {
                                                value: 10,
                                                message: 'Mínimo 10 caracteres',
                                            },
                                            maxLength: {
                                                value: 2000,
                                                message: 'Máximo 2000 caracteres',
                                            },
                                        })}
                                        className={`textarea textarea-bordered w-full h-32 ${
                                            errors.description ? 'textarea-error' : ''
                                        }`}
                                        placeholder="Describe detalladamente el producto..."
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.description?.message}</span>
                                        <span className="label-text-alt">{watch('description')?.length || 0}/2000</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 2: Precios y Stock */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl flex items-center gap-2">
                            <FaDollarSign /> Precios y Stock
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Precio Actual */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio Actual *</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        {...register('price', {
                                            required: 'El precio es requerido',
                                            min: {
                                                value: 1,
                                                message: 'El precio debe ser mayor a 0',
                                            },
                                            valueAsNumber: true,
                                        })}
                                        className={`input input-bordered w-full pl-8 ${
                                            errors.price ? 'input-error' : ''
                                        }`}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        onChange={calculateDiscount}
                                    />
                                </div>
                                {errors.price && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.price.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Precio Original */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio Original</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        {...register('originalPrice', {
                                            min: {
                                                value: 1,
                                                message: 'El precio debe ser mayor a 0',
                                            },
                                            valueAsNumber: true,
                                        })}
                                        className={`input input-bordered w-full pl-8 ${
                                            errors.originalPrice ? 'input-error' : ''
                                        }`}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        onChange={calculateDiscount}
                                    />
                                </div>
                                {errors.originalPrice && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.originalPrice.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Descuento */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Descuento %</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('discount', {
                                            min: 0,
                                            max: 100,
                                            valueAsNumber: true,
                                        })}
                                        className={`input input-bordered w-full ${
                                            errors.discount ? 'input-error' : ''
                                        }`}
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        disabled
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">%</span>
                                </div>
                                {watch('discount') && (
                                    <div className="mt-2 badge badge-success">
                                        {watch('discount')}% de descuento
                                    </div>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Stock *</span>
                                </label>
                                <input
                                    {...register('stock', {
                                        required: 'El stock es requerido',
                                        min: {
                                            value: 0,
                                            message: 'El stock no puede ser negativo',
                                        },
                                        valueAsNumber: true,
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.stock ? 'input-error' : ''
                                    }`}
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                                {errors.stock && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.stock.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Producto Nuevo */}
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input
                                        {...register('isNewP')}
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                    />
                                    <span className="label-text font-semibold">¿Es producto nuevo?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Imágenes */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl flex items-center gap-2">
                            <FaImage /> Imágenes del Producto *
                        </h2>
                        
                        {/* Método de carga */}
                        <div className="tabs tabs-boxed mb-6">
                            <button
                                type="button"
                                className={`tab ${uploadMethod === 'url' ? 'tab-active' : ''}`}
                                onClick={() => setUploadMethod('url')}
                            >
                                <FaLink className="mr-2" /> Por URL
                            </button>
                            <button
                                type="button"
                                className={`tab ${uploadMethod === 'file' ? 'tab-active' : ''}`}
                                onClick={() => setUploadMethod('file')}
                            >
                                <FaUpload className="mr-2" /> Subir Archivo
                            </button>
                        </div>

                        {uploadMethod === 'url' ? (
                            /* Carga por URL */
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2 items-start">
                                        <div className="form-control flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="badge badge-neutral">Imagen {index + 1}</span>
                                                {watchImages[index] === watch('mainImage') && (
                                                    <span className="badge badge-primary">Principal</span>
                                                )}
                                            </div>
                                            <input
                                                {...register(`images.${index}`, {
                                                    pattern: {
                                                        value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                                                        message: 'URL inválida',
                                                    },
                                                })}
                                                className={`input input-bordered w-full ${
                                                    errors.images?.[index] ? 'input-error' : ''
                                                }`}
                                                type="text"
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                            {errors.images?.[index] && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">
                                                        {errors.images[index]?.message}
                                                    </span>
                                                </label>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 pt-8">
                                            <button
                                                type="button"
                                                onClick={() => setAsMainImage(index)}
                                                className="btn btn-sm btn-outline"
                                                disabled={!watchImages[index] || watchImages[index] === watch('mainImage')}
                                                title="Establecer como principal"
                                            >
                                                <FaStar />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="btn btn-sm btn-error"
                                                disabled={fields.length <= 1}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="btn btn-outline btn-block"
                                    disabled={fields.length >= 10}
                                >
                                    <FaPlus /> Agregar otra imagen (Máx. 10)
                                </button>
                            </div>
                        ) : (
                            /* Carga por archivo */
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                                    uploading ? 'border-primary' : 'border-gray-300'
                                }`}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={handleFileInputClick}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                                    disabled={uploading}
                                />
                                
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                        <p>Subiendo imágenes...</p>
                                    </div>
                                ) : (
                                    <>
                                        <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                                        <p className="text-lg font-semibold mb-2">
                                            Arrastra y suelta imágenes aquí
                                        </p>
                                        <p className="text-gray-600 mb-4">o haz clic para seleccionar archivos</p>
                                        <p className="text-sm text-gray-500">
                                            JPG, PNG, GIF hasta 5MB cada una. Máximo 10 imágenes.
                                        </p>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Preview de imágenes */}
                        {previewImages.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-4">Vista previa ({previewImages.length} imágenes)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {previewImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square overflow-hidden rounded-lg border">
                                                <img
                                                    src={img}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setAsMainImage(watchImages.indexOf(img))}
                                                    className="btn btn-xs btn-circle"
                                                    title="Establecer como principal"
                                                >
                                                    <FaStar />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(watchImages.indexOf(img))}
                                                    className="btn btn-xs btn-circle btn-error"
                                                    title="Eliminar"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            {img === watch('mainImage') && (
                                                <div className="absolute top-1 right-1">
                                                    <span className="badge badge-primary badge-xs">Principal</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 4: Categorías y Características */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Categorías */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl flex items-center gap-2">
                                <FaLayerGroup /> Categorías
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Categoría</span>
                                    </label>
                                    <input
                                        {...register('category', {
                                            maxLength: {
                                                value: 50,
                                                message: 'Máximo 50 caracteres',
                                            },
                                        })}
                                        className={`input input-bordered w-full ${
                                            errors.category ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        placeholder="Ej: Electrónica"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Subcategoría</span>
                                    </label>
                                    <input
                                        {...register('subcategory', {
                                            maxLength: {
                                                value: 50,
                                                message: 'Máximo 50 caracteres',
                                            },
                                        })}
                                        className={`input input-bordered w-full ${
                                            errors.subcategory ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        placeholder="Ej: Smartphones"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Características */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl flex items-center gap-2">
                                <FaStar /> Características
                            </h2>
                            
                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            className="input input-bordered flex-1"
                                            placeholder="Ej: Pantalla 6.5 pulgadas"
                                        />
                                        {features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="btn btn-error btn-square"
                                            >
                                                <FaMinus />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="btn btn-outline btn-sm"
                                >
                                    <FaPlus /> Agregar característica
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 5: Tags */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl flex items-center gap-2">
                            <FaTag /> Etiquetas
                        </h2>
                        
                        <div className="space-y-3">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => updateTag(index, e.target.value)}
                                        className="input input-bordered flex-1"
                                        placeholder="Ej: tecnología, smartphone, apple"
                                    />
                                    {tags.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="btn btn-error btn-square"
                                        >
                                            <FaMinus />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTag}
                                className="btn btn-outline btn-sm"
                            >
                                <FaPlus /> Agregar etiqueta
                            </button>
                        </div>

                        {/* Tags activos */}
                        {watch('tags').filter((t: string) => t.trim() !== '').length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {watch('tags')
                                        .filter((t: string) => t.trim() !== '')
                                        .map((tag: string, index: number) => (
                                            <span key={index} className="badge badge-outline">
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 6: Botones de acción */}
                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard/products')}
                        className="btn btn-ghost"
                        disabled={uploading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={uploading}
                    >
                        {uploading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Creando producto...
                            </>
                        ) : (
                            'Crear Producto'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProductForm;

/*import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaUpload, FaLink, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useProduct } from '../../../Context/ProductContext';

const CreateProductForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            stock: '',
            images: [''],
            category: '',
            subcategory: '',
            features: [''],
            tags: [''],
            isNewP: false,
            discount: '',
            sku: '',
            weight: '',
            dimensions: {
                height: '',
                width: '',
                depth: '',
            },
        }
    });

    const { createProduct } = useProduct();
    const navigate = useNavigate();
    
    // Manejo de array de imágenes
    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images'
    });

    // Manejo de array de características
    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
        control,
        name: 'features'
    });

    // Manejo de array de tags
    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags'
    });

    const [uploading, setUploading] = useState(false);
    const discount = watch('discount');
    const price = watch('price');

    // Calcular precio original basado en descuento
    const calculateOriginalPrice = () => {
        if (price && discount) {
            const priceNum = parseFloat(price);
            const discountNum = parseFloat(discount);
            if (!isNaN(priceNum) && !isNaN(discountNum)) {
                const original = priceNum / (1 - discountNum / 100);
                setValue('originalPrice', original.toFixed(2));
            }
        }
    };

    const onSubmit = async (data: any) => {
        try {
            // Convertir strings a números donde sea necesario
            const formattedData = {
                ...data,
                price: parseFloat(data.price),
                originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
                stock: parseInt(data.stock),
                discount: data.discount ? parseFloat(data.discount) : undefined,
                weight: data.weight ? parseFloat(data.weight) : undefined,
                dimensions: data.dimensions.height ? {
                    height: parseFloat(data.dimensions.height),
                    width: parseFloat(data.dimensions.width),
                    depth: parseFloat(data.dimensions.depth),
                } : undefined,
                // Filtrar arrays vacíos
                images: data.images.filter((img: string) => img.trim() !== ''),
                features: data.features.filter((feature: string) => feature.trim() !== ''),
                tags: data.tags.filter((tag: string) => tag.trim() !== ''),
            };

            const result = await createProduct(formattedData);

            if (result.success) {
                toast.success(result.message);
                reset();
                navigate('/admin/dashboard/products');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error al crear el producto');
        }
    };

    // Función para subir imagen (simulada - implementar con tu servicio de cloud)
    const handleImageUpload = async () => {
        setUploading(true);
        // Aquí implementarías la subida real a Cloudinary, AWS S3, etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // URL de ejemplo (en producción obtendrías esto del servicio de cloud)
        const mockImageUrl = `https://picsum.photos/seed/${Date.now()}/600/600`;
        
        // Agregar la nueva URL al array de imágenes
        if (imageFields.length === 1 && !imageFields[0]) {
            setValue('images.0', mockImageUrl);
        } else {
            appendImage(mockImageUrl);
        }
        
        setUploading(false);
        toast.success('Imagen subida exitosamente');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Producto</h1>
                <p className="text-gray-600 mt-2">Completa todos los campos requeridos para agregar un nuevo producto</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Información Básica</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Nombre del Producto *</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo 100 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                    type="text"
                                    placeholder="Ej: iPhone 14 Pro"
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name.message as string}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">SKU (Código único)</span>
                                    <span className="label-text-alt text-gray-500">Auto-generado si se deja vacío</span>
                                </label>
                                <input
                                    {...register('sku', {
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${errors.sku ? 'input-error' : ''}`}
                                    type="text"
                                    placeholder="Ej: IPH-14PRO-256"
                                />
                                {errors.sku && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.sku.message as string}</span>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text font-semibold">Descripción *</span>
                            </label>
                            <textarea
                                {...register('description', {
                                    required: 'La descripción es requerida',
                                    minLength: {
                                        value: 10,
                                        message: 'Mínimo 10 caracteres',
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: 'Máximo 2000 caracteres',
                                    },
                                })}
                                className={`textarea textarea-bordered h-32 ${errors.description ? 'textarea-error' : ''}`}
                                placeholder="Describe detalladamente el producto..."
                            />
                            <label className="label">
                                <span className="label-text-alt text-gray-500">
                                    {watch('description')?.length || 0}/2000 caracteres
                                </span>
                                {errors.description && (
                                    <span className="label-text-alt text-error">{errors.description.message as string}</span>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Precio e Inventario</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio de Venta *</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        {...register('price', {
                                            required: 'El precio es requerido',
                                            min: {
                                                value: 0.01,
                                                message: 'El precio debe ser mayor a 0',
                                            },
                                            max: {
                                                value: 999999,
                                                message: 'Precio máximo: $999,999',
                                            },
                                        })}
                                        className={`input input-bordered w-full pl-8 ${errors.price ? 'input-error' : ''}`}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.price.message as string}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Descuento (%)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('discount', {
                                            min: {
                                                value: 0,
                                                message: 'Mínimo 0%',
                                            },
                                            max: {
                                                value: 100,
                                                message: 'Máximo 100%',
                                            },
                                            onChange: calculateOriginalPrice,
                                        })}
                                        className={`input input-bordered w-full ${errors.discount ? 'input-error' : ''}`}
                                        type="number"
                                        step="0.01"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">%</span>
                                </div>
                                {errors.discount && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.discount.message as string}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Stock *</span>
                                </label>
                                <input
                                    {...register('stock', {
                                        required: 'El stock es requerido',
                                        min: {
                                            value: 0,
                                            message: 'El stock no puede ser negativo',
                                        },
                                        valueAsNumber: true,
                                    })}
                                    className={`input input-bordered w-full ${errors.stock ? 'input-error' : ''}`}
                                    type="number"
                                    placeholder="0"
                                />
                                {errors.stock && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.stock.message as string}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {discount && parseFloat(discount) > 0 && (
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio Original (calculado)</span>
                                </label>
                                <input
                                    {...register('originalPrice')}
                                    className="input input-bordered w-full bg-gray-50"
                                    type="number"
                                    step="0.01"
                                    readOnly
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-500">
                                        Precio antes del descuento. Se calcula automáticamente.
                                    </span>
                                </label>
                            </div>
                        )}

                        <div className="form-control mt-4">
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    {...register('isNewP')}
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                />
                                <span className="label-text font-semibold">Marcar como producto nuevo</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Imágenes del Producto</h2>
                        <p className="text-gray-600 mb-4">Sube al menos una imagen. La primera imagen será la principal.</p>
                        
                        <div className="mb-6">
                            <button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={uploading}
                                className="btn btn-primary gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Subiendo...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload />
                                        Subir Imagen
                                    </>
                                )}
                            </button>
                            <p className="text-sm text-gray-500 mt-2">
                                O ingresa las URLs manualmente en los campos de abajo
                            </p>
                        </div>

                        <div className="space-y-4">
                            {imageFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    <div className="form-control flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaImage className="text-gray-400" />
                                            <span className="text-sm font-medium">
                                                {index === 0 ? 'Imagen Principal' : `Imagen ${index + 1}`}
                                            </span>
                                            {index === 0 && (
                                                <span className="badge badge-primary badge-sm">Principal</span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                {...register(`images.${index}`, {
                                                    pattern: {
                                                        value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                                                        message: 'URL inválida',
                                                    },
                                                })}
                                                className={`input input-bordered w-full ${errors.images?.[index] ? 'input-error' : ''}`}
                                                type="text"
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                            <FaLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {errors.images?.[index] && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.images[index]?.message as string}
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                    
                                    {imageFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="btn btn-ghost btn-sm text-error mt-8"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                    
                                    {index === imageFields.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => appendImage('')}
                                            className="btn btn-ghost btn-sm mt-8"
                                        >
                                            <FaPlus />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {imageFields.some(field => field) && (
                            <div className="mt-8">
                                <h3 className="font-semibold mb-4">Vista Previa</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {imageFields.map((field, index) => (
                                        field && (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                                                    <img
                                                        src={field}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';
                                                        }}
                                                    />
                                                </div>
                                                <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                    {index === 0 ? 'Principal' : index + 1}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Categorización</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Categoría</span>
                                </label>
                                <select
                                    {...register('category')}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Seleccionar categoría</option>
                                    <option value="Electrónica">Electrónica</option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Hogar">Hogar</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Libros">Libros</option>
                                    <option value="Juguetes">Juguetes</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Subcategoría</span>
                                </label>
                                <input
                                    {...register('subcategory')}
                                    className="input input-bordered w-full"
                                    type="text"
                                    placeholder="Ej: Smartphones, Camisetas, etc."
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="label">
                                <span className="label-text font-semibold">Características</span>
                            </label>
                            <div className="space-y-2">
                                {featureFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`features.${index}`)}
                                            className="input input-bordered flex-1"
                                            type="text"
                                            placeholder="Ej: 256GB de almacenamiento, 8GB RAM"
                                        />
                                        {featureFields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="btn btn-ghost btn-sm text-error"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                        {index === featureFields.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={() => appendFeature('')}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                <FaPlus />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="label">
                                <span className="label-text font-semibold">Etiquetas</span>
                                <span className="label-text-alt text-gray-500">Separadas por comas</span>
                            </label>
                            <div className="space-y-2">
                                {tagFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`tags.${index}`)}
                                            className="input input-bordered flex-1"
                                            type="text"
                                            placeholder="Ej: smartphone, apple, premium"
                                        />
                                        {tagFields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="btn btn-ghost btn-sm text-error"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                        {index === tagFields.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={() => appendTag('')}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                <FaPlus />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Especificaciones Técnicas</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Peso (gramos)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('weight', {
                                            min: {
                                                value: 0,
                                                message: 'El peso no puede ser negativo',
                                            },
                                        })}
                                        className={`input input-bordered w-full ${errors.weight ? 'input-error' : ''}`}
                                        type="number"
                                        step="0.01"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">g</span>
                                </div>
                                {errors.weight && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.weight.message as string}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="label">
                                <span className="label-text font-semibold">Dimensiones (cm)</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Alto</span>
                                    </label>
                                    <input
                                        {...register('dimensions.height', {
                                            min: {
                                                value: 0,
                                                message: 'La altura no puede ser negativa',
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                        type="number"
                                        step="0.01"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Ancho</span>
                                    </label>
                                    <input
                                        {...register('dimensions.width', {
                                            min: {
                                                value: 0,
                                                message: 'El ancho no puede ser negativo',
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                        type="number"
                                        step="0.01"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Profundidad</span>
                                    </label>
                                    <input
                                        {...register('dimensions.depth', {
                                            min: {
                                                value: 0,
                                                message: 'La profundidad no puede ser negativa',
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                        type="number"
                                        step="0.01"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {}
                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard/products')}
                        className="btn btn-ghost"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Creando...
                            </>
                        ) : (
                            'Crear Producto'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProductForm;*/

/*import { useForm } from 'react-hook-form'
import { useProduct } from '../../../Context/ProductContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import type { ReactNode } from 'react'

const CreateProductForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onChange' })

    const { createProduct } = useProduct()

    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        const result = await createProduct(data)

        if (result.success) {
            toast.success(result.message)
            reset()
            navigate('/admin/dashboard/products')
        } else {
            toast.error(result.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 3 caracteres',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Máximo 50 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.name
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    autoComplete="name"
                />
                {errors.name && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.name.message as ReactNode}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('description', {
                        required: 'La descripción es requerida',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 10 caracteres',
                        },
                        maxLength: {
                            value: 500,
                            message: 'Máximo 500 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.description
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="text"
                    placeholder="Descripción"
                    name="description"
                    autoComplete="description"
                />
                {errors.description && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.description.message as ReactNode}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('price', {
                        required: 'El precio es requerido',
                        min: {
                            value: 2,
                            message: 'El precio debe ser máyor a 1',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.price
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="number"
                    placeholder="Precio"
                    name="price"
                    autoComplete="price"
                />
                {errors.price && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.price.message as ReactNode}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('stock', {
                        required: 'El stock es requerido',
                        min: {
                            value: 0,
                            message:
                                'El stock minimo debe ser mayor o igual a 0',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.stock
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    autoComplete="stock"
                />
                {errors.stock && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.stock.message as ReactNode}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('imageUrl', {
                        required: 'La url de la imagen es requerida',
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.imageUrl
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="text"
                    placeholder="Imagen"
                    name="imageUrl"
                    autoComplete="imageUrl"
                />
                {errors.imageUrl && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.imageUrl.message as ReactNode}
                    </p>
                )}
            </div>

            <button className="btn btn-primary" type="submit">
                Crear Producto
            </button>
        </form>
    )
}

export default CreateProductForm
*/