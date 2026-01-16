import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useProduct } from '../../../Context/ProductContext';
import { useCategory } from '../../../Context/CategoryContext';
import { 
    FaTag, 
    FaStar, 
    FaDollarSign, 
    FaBox, 
    FaLayerGroup,
    FaSave,
    FaUndo
} from 'react-icons/fa';
import { useUpload } from '../../../Hooks/useUpload';
import ImageUpload from '../../ImageUpload/ImageUpload';

// Definir tipos
interface ProductImage {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    isBlob?: boolean;
    file?: File;
}

interface UpdateProductFormProps {
    product: any;
}

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    stock: number;
    images: ProductImage[];
    mainImage: number;
    category?: string;
    subcategory?: string;
    features: string[];
    isNew: boolean;
    discount?: number;
    tags: string[];
    sku?: string;
}

const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
    const [uploading, setUploading] = useState(false);
    const [features, setFeatures] = useState<string[]>(['']);
    const [tags, setTags] = useState<string[]>(['']);
    const [originalData, setOriginalData] = useState<ProductFormData | null>(null);
    const { deleteImage, uploadImages: uploadToServer } = useUpload();
    
    const [images, setImages] = useState<ProductImage[]>([]);
    const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
    const [removedImages, setRemovedImages] = useState<ProductImage[]>([]);
    const [hasBlobImages, setHasBlobImages] = useState(false);

    const navigate = useNavigate();
    const { updateProduct, productLoading } = useProduct() as any;
    const { activeCategories } = useCategory();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
        setValue,
    } = useForm<ProductFormData>({
        mode: 'onChange',
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            stock: product?.stock || 0,
            images: [],
            features: [],
            tags: [],
            mainImage: 0,
            isNew: false
        }
    });

    const isLoadedRef = useRef(false);

    useEffect(() => {
        if (!product || Object.keys(product).length === 0 || isLoadedRef.current) return;
        const safeImages = Array.isArray(product.images) ? product.images : [];
        const safeFeatures = Array.isArray(product.features) ? product.features : [];
        const safeTags = Array.isArray(product.tags) ? product.tags : [];

        const formattedImages = formatImages(safeImages);

        const formattedData: ProductFormData = {
            ...product,
            images: formattedImages,
            features: safeFeatures,
            tags: safeTags,
            mainImage: product.mainImage || 0,
            isNew: product.isNew || false,
        };
        reset(formattedData);
        setOriginalData(formattedData);
        setImages(formattedImages);
        setExistingImages(formattedImages);

        setFeatures(product.features?.length ? product.features : ['']);
        setTags(product.tags?.length ? product.tags : ['']);
        isLoadedRef.current = true;
    }, [product, reset]);

    const formatImages = (imageArray: any[]): ProductImage[] => {
        if (!imageArray || !Array.isArray(imageArray)) return [];
        
        return imageArray.map((img, index) => {
            if (typeof img === 'string') {
                let filename = img.split('/').pop() || `img-${index}`;
                
                return {
                    url: img,
                    filename: filename,
                    originalName: filename,
                    size: 0,
                    mimetype: 'image/jpeg',
                    isBlob: false
                };
            }
            return {
                ...img,
                isBlob: img.isBlob !== undefined ? img.isBlob : false
            };
        });
    };

    const calculateDiscount = () => {
        const price = watch('price');
        const originalPrice = watch('originalPrice');
        
        if (originalPrice && originalPrice > price) {
            const discount = ((originalPrice - price) / originalPrice) * 100;
            setValue('discount', Math.round(discount) as any, { shouldDirty: true });
        } else {
            setValue('discount', undefined as any, { shouldDirty: true });
        }
    };

    const handleReset = () => {
        if (originalData) {
            reset(originalData);
            
            const formattedImages = formatImages(originalData.images || []);
            setImages(formattedImages);
            
            setFeatures(originalData.features?.length > 0 ? originalData.features : ['']);
            setTags(originalData.tags?.length > 0 ? originalData.tags : ['']);
            toast.success('Cambios descartados');
        }
    };

    const addFeature = () => {
        const newFeatures = [...features, ''];
        setFeatures(newFeatures);
        setValue('features', newFeatures.filter(f => f?.trim() !== ''), { shouldDirty: true });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
        setValue('features', newFeatures.filter(f => f?.trim() !== ''), { shouldDirty: true });
    };

    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures.length > 0 ? newFeatures : ['']);
        setValue('features', newFeatures.filter(f => f?.trim() !== ''), { shouldDirty: true });
    };

    const addTag = () => {
        const newTags = [...tags, ''];
        setTags(newTags);
        setValue('tags', newTags.filter(t => t?.trim() !== ''), { shouldDirty: true });
    };

    const updateTag = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
        setValue('tags', newTags.filter(t => t?.trim() !== ''), { shouldDirty: true });
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags.length > 0 ? newTags : ['']);
        setValue('tags', newTags.filter(t => t?.trim() !== ''), { shouldDirty: true });
    };

    const handleImagesChange = useCallback((newImages: ProductImage[]) => {
        const removed = existingImages.filter(e => !newImages.some(n => n.url === e.url));
        setRemovedImages(removed);

        setImages(newImages);
        setValue('images', newImages, { shouldDirty: true });
        setHasBlobImages(newImages.some(n => (n as any).isBlob));

        if (newImages.length > 0) {
            setValue('mainImage', 0);
        }
    }, [setValue, existingImages]);

    const onSubmit = async (data: ProductFormData) => {
        if (images.length === 0) {
            toast.error('Debe agregar al menos una imagen');
            return;
        }
        setUploading(true);
        try {
            const blobImages = images.filter(img => (img as any).isBlob && (img as any).file) as (ProductImage & { file?: File })[];
            let uploadedResults: any[] = [];
            if (blobImages.length > 0) {
                const files = blobImages.map(b => b.file!);
                uploadedResults = await uploadToServer(files, product._id);
            }

            const uploadedIterator = uploadedResults[Symbol.iterator]();
            const finalImages = images.map(img => {
                if ((img as any).isBlob) {
                    const next = uploadedIterator.next();
                    const uploaded = next.value;
                    return {
                        url: uploaded?.url || img.url,
                        filename: uploaded?.filename || img.filename,
                        originalName: uploaded?.originalName || img.originalName,
                        size: uploaded?.size || img.size,
                        mimetype: uploaded?.mimetype || img.mimetype,
                        isBlob: false,
                    } as ProductImage;
                }
                return img;
            });

            if (removedImages.length > 0) {
                for (const rem of removedImages) {
                    try {
                        await deleteImage(rem.filename);
                    } catch (err) {
                        console.error('Error eliminando imagen en servidor:', err);
                    }
                }
            }

            const imageUrls = finalImages.map(img => img.url);

            const result = await updateProduct(product._id, {
                ...data,
                images: imageUrls,
                mainImage: data.mainImage,
                features: data.features.filter(f => f?.trim() !== ''),
                tags: data.tags.filter(t => t?.trim() !== ''),
            });

            if (result.success) {
                toast.success(result.message);
                navigate('/admin/dashboard/products');
            }
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar el producto');
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = async () => {
        images.forEach(img => {
            if (img.url.startsWith('blob:')) {
                URL.revokeObjectURL(img.url);
            }
        });
        navigate('/admin/dashboard/products');
    };

    if (productLoading || !product) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="ml-2">Cargando datos del producto...</span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {hasBlobImages && (
                <div className="alert alert-warning mb-6 shadow-lg">
                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <p className="font-semibold">¡Atención! Imágenes temporales detectadas</p>
                            <p className="text-sm">
                                Algunas imágenes se guardaron como URLs temporales. Por favor, re-sube estas imágenes para guardarlas permanentemente.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {isDirty && (
                <div className="alert alert-warning mb-6 shadow-lg">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>Tienes cambios sin guardar</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Sección 1: Información Básica */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl flex items-center gap-2">
                            <FaBox /> Información Básica
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Nombre del Producto *</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'El nombre es requerido',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        maxLength: { value: 100, message: 'Máximo 100 caracteres' },
                                    })}
                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                    type="text"
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name.message?.toString()}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">SKU</span>
                                </label>
                                <input
                                    {...register('sku', {
                                        maxLength: { value: 50, message: 'Máximo 50 caracteres' },
                                    })}
                                    className={`input input-bordered w-full ${errors.sku ? 'input-error' : ''}`}
                                    type="text"
                                    placeholder="Ej: PRO-1234"
                                />
                                {errors.sku && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.sku.message?.toString()}</span>
                                    </label>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Descripción *</span>
                                    </label>
                                    <textarea
                                        {...register('description', {
                                            required: 'La descripción es requerida',
                                            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                                            maxLength: { value: 2000, message: 'Máximo 2000 caracteres' },
                                        })}
                                        className={`textarea textarea-bordered w-full h-32 ${errors.description ? 'textarea-error' : ''}`}
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.description?.message?.toString()}</span>
                                        <span className="label-text-alt">{(watch('description')?.length || 0)}/2000</span>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio Actual *</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        {...register('price', {
                                            required: 'El precio es requerido',
                                            min: { value: 1, message: 'El precio debe ser mayor a 0' },
                                            valueAsNumber: true,
                                        })}
                                        className={`input input-bordered w-full pl-8 ${errors.price ? 'input-error' : ''}`}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        onChange={calculateDiscount}
                                    />
                                </div>
                                {errors.price && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.price.message?.toString()}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Precio Original</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        {...register('originalPrice', {
                                            min: { value: 1, message: 'El precio debe ser mayor a 0' },
                                            valueAsNumber: true,
                                        })}
                                        className={`input input-bordered w-full pl-8 ${errors.originalPrice ? 'input-error' : ''}`}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        onChange={calculateDiscount}
                                    />
                                </div>
                                {errors.originalPrice && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.originalPrice.message?.toString()}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Descuento %</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('discount', { min: 0, max: 100, valueAsNumber: true })}
                                        className={`input input-bordered w-full ${errors.discount ? 'input-error' : ''}`}
                                        type="number"
                                        min="0"
                                        max="100"
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

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Stock *</span>
                                </label>
                                <input
                                    {...register('stock', {
                                        required: 'El stock es requerido',
                                        min: { value: 0, message: 'El stock no puede ser negativo' },
                                        valueAsNumber: true,
                                    })}
                                    className={`input input-bordered w-full ${errors.stock ? 'input-error' : ''}`}
                                    type="number"
                                    min="0"
                                />
                                {errors.stock && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.stock.message?.toString()}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input {...register('isNew')} type="checkbox" className="checkbox checkbox-primary" />
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
                            <FaBox /> Imágenes del Producto *
                        </h2>
                        
                        <ImageUpload
                            key={product?._id || 'new'}
                            initialImages={images as any}
                            onImagesChange={handleImagesChange}
                            maxImages={10}
                            maxSizeMB={5}
                        />
                        
                        <input type="hidden" {...register('mainImage')} />
                    </div>
                </div>

                {/* Sección 4: Categorías */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    <select
                                        {...register('category', {
                                            required: 'La categoría es requerida',
                                        })}
                                        className={`select select-bordered w-full ${
                                            errors.category ? 'select-error' : ''
                                        }`}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {activeCategories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.category.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Subcategoría</span>
                                    </label>
                                    <input
                                        {...register('subcategory', { maxLength: { value: 50, message: 'Máximo 50 caracteres' } })}
                                        className={`input input-bordered w-full ${errors.subcategory ? 'input-error' : ''}`}
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
                                            value={feature || ''}
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
                                                -
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="btn btn-outline btn-sm"
                                >
                                    + Agregar característica
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
                                        value={tag || ''}
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
                                            -
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTag}
                                className="btn btn-outline btn-sm"
                            >
                                + Agregar etiqueta
                            </button>
                        </div>

                        {(watch('tags') || []).filter((t: string) => t?.trim() !== '').length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {(watch('tags') || [])
                                        .filter((t: string) => t?.trim() !== '')
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

                {/* Botones de acción */}
                <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t">
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-outline"
                            disabled={!isDirty || uploading}
                        >
                            <FaUndo className="mr-2" />
                            Descartar cambios
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-ghost"
                            disabled={uploading}
                        >
                            Cancelar
                        </button>
                    </div>
                    
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={uploading || !isDirty || images.length === 0}
                    >
                        {uploading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Guardando...
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" />
                                Guardar cambios
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductForm;
