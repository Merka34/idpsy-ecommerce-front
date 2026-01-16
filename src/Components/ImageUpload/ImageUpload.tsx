import { useState, useRef, useEffect } from 'react';
import { FaUpload, FaTrash, FaLink, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ImageType {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    isBlob: boolean;
    file?: File; // present only for newly selected files (deferred upload)
}

interface ImageUploadProps {
    initialImages?: ImageType[];
    onImagesChange: (images: ImageType[]) => void;
    maxImages?: number;
    maxSizeMB?: number;
}

const ImageUpload = ({ 
    initialImages = [], 
    onImagesChange, 
    maxImages = 10, 
    maxSizeMB = 5 
}: ImageUploadProps) => {
    const [images, setImages] = useState<ImageType[]>(initialImages);
    const [dragOver, setDragOver] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    

    // Actualizar imágenes cuando cambian las iniciales
    useEffect(() => {
        // Si llegan imágenes iniciales y son diferentes a las que tenemos, actualizamos
        if (initialImages && initialImages.length > 0) {
            setImages(initialImages);
        } else if (!initialImages || initialImages.length === 0) {
            setImages([]);
        }
    }, [initialImages]);

    const handleFileSelect = (files: FileList) => {
        if (images.length + files.length > maxImages) {
            toast.error(`Máximo ${maxImages} imágenes permitidas`);
            return;
        }

        // Validar tamaño de cada archivo
        const oversizedFiles = Array.from(files).filter(
            file => file.size > maxSizeMB * 1024 * 1024
        );
        
        if (oversizedFiles.length > 0) {
            toast.error(`Algunas imágenes exceden ${maxSizeMB}MB`);
            return;
        }

        // Crear previews locales (deferred upload). No llamamos al servidor aquí.
        const newImages = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            filename: `${Date.now()}-${file.name}`,
            originalName: file.name,
            size: file.size,
            mimetype: file.type,
            isBlob: true,
            file,
        } as ImageType));

        const combined = [...images, ...newImages];
        setImages(combined);
        onImagesChange(combined);
        toast.success(`${files.length} imagen(es) preparada(s) para subir`);
    };

    const handleRemoveImage = (index: number) => {
        const imageToRemove = images[index];

        // Si es una preview blob, revocar URL ahora
        if (imageToRemove?.isBlob && imageToRemove.url.startsWith('blob:')) {
            try {
                URL.revokeObjectURL(imageToRemove.url);
            } catch (e) {
                // ignore
            }
        }

        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages);

        // Ajustar índice seleccionado si es necesario
        if (selectedImageIndex >= newImages.length && newImages.length > 0) {
            setSelectedImageIndex(newImages.length - 1);
        } else if (newImages.length === 0) {
            setSelectedImageIndex(0);
        }

        toast.success('Imagen eliminada (pendiente de guardar)');
    };

    const handleSetMainImage = (index: number) => {
        if (index === 0) return;
        
        const newImages = [
            images[index],
            ...images.filter((_, i) => i !== index)
        ];
        setImages(newImages);
        onImagesChange(newImages);
        setSelectedImageIndex(0);
        toast.success('Imagen principal establecida');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        
        const files = e.dataTransfer.files;
        const imageFiles = Array.from(files).filter(file => 
            file.type.startsWith('image/')
        );
        
        if (imageFiles.length > 0) {
            handleFileSelect(imageFiles as any);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            {/* Área de subida */}
            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    dragOver 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                />
                
                (
                    <>
                        <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Arrastra y suelta imágenes aquí
                        </h3>
                        <p className="text-gray-600 mb-3">o haz clic para seleccionar</p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>Formatos: JPG, PNG, GIF, WEBP</p>
                            <p>Máximo: {maxSizeMB}MB por imagen</p>
                            <p>Límite: {maxImages} imágenes</p>
                        </div>
                    </>
                )
            </div>

            {/* Vista previa de imágenes */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">
                            Imágenes del producto ({images.length}/{maxImages})
                        </h3>
                        {selectedImageIndex === 0 && images.length > 1 && (
                            <div className="badge badge-primary badge-lg">
                                <FaCheck className="mr-1" /> Principal
                            </div>
                        )}
                    </div>

                    {/* Imagen principal grande */}
                    {images[selectedImageIndex] && (
                        <div className="relative rounded-lg overflow-hidden border bg-gray-50">
                            <img
                                src={images[selectedImageIndex].url}
                                alt="Vista principal"
                                className="w-full h-64 object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Error+Imagen';
                                }}
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                {selectedImageIndex !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleSetMainImage(selectedImageIndex)}
                                        className="btn btn-sm btn-primary"
                                        title="Establecer como principal"
                                    >
                                        <FaCheck /> Principal
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(selectedImageIndex)}
                                    className="btn btn-sm btn-error"
                                    title="Eliminar"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="truncate">
                                        {images[selectedImageIndex].originalName}
                                    </span>
                                    <span>
                                        {formatFileSize(images[selectedImageIndex].size)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Miniaturas */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {images.map((image, index) => (
            <div 
            key={`${image.filename}-${index}`} 
            className={`relative cursor-pointer transition-all ${selectedImageIndex === index ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedImageIndex(index)} // <-- ESTO permite seleccionar al hacer click
            >
            <div className="aspect-square overflow-hidden rounded-lg border">
                <img 
                    src={image.url}
                    alt={image.originalName}
                    className="w-full h-full object-cover"
                />
            </div>
        {image.isBlob && (
            <div className="absolute inset-0 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
                <div className="text-center p-2 bg-white/90 rounded">
                    <p className="text-xs font-semibold text-yellow-800">
                        Imagen Temporal
                    </p>
                    <p className="text-xs text-yellow-600">
                        Re-subir necesaria
                    </p>
                </div>
            </div>
        )}
    </div>
))}
                    </div>

                    {/* Información de imágenes */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="font-semibold">Total de imágenes:</p>
                                <p>{images.length} / {maxImages}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Tamaño total:</p>
                                <p>
                                    {formatFileSize(
                                        images.reduce((acc, img) => acc + img.size, 0)
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold">Imagen principal:</p>
                                <p className="truncate">
                                    {images[0]?.originalName || 'No establecida'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Instrucciones */}
            {images.length === 0 && (
                <div className="alert alert-info">
                    <div className="flex items-center gap-3">
                        <FaLink />
                        <div>
                            <p className="font-semibold">Cómo funciona:</p>
                            <ul className="text-sm mt-1 space-y-1">
                                <li>1. Sube imágenes arrastrando o haciendo clic</li>
                                <li>2. La primera imagen será la principal</li>
                                <li>3. Puedes cambiar la imagen principal en cualquier momento</li>
                                <li>4. Las imágenes se guardan permanentemente en el servidor</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;