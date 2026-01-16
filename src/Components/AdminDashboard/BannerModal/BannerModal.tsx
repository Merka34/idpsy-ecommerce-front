import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { useBanner } from '../../../Context/BannerContext';
import { useUpload } from '../../../Hooks/useUpload';
import { FaSpinner } from 'react-icons/fa';

interface ProductImage {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    isBlob?: boolean;
    file?: File;
}

const BannerModal = ({ onClose, banner = null }: any) => {
    const { addBanner, updateBanner } = useBanner();
    const { deleteImage, uploadImages } = useUpload();
    const [uploading, setUploading] = useState(false);
    const [bannerImage, setBannerImage] = useState<ProductImage[]>(
        banner && banner.imageUrl 
            ? [{ 
                url: banner.imageUrl, 
                filename: banner.filename || banner.imageUrl.split('/').pop() || 'banner.jpg', 
                originalName: banner.title, 
                size: 0,
                mimetype: 'image/jpeg',
                isBlob: false 
            }] 
            : []
    );
    const [existingImages, setExistingImages] = useState<ProductImage[]>(bannerImage);

    const { register, handleSubmit, formState: { errors } } = useForm({ 
        defaultValues: banner ? {
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            link: banner.link || '',
            order: banner.order || 0,
            isActive: banner.isActive !== undefined ? banner.isActive : true
        } : {
            isActive: true,
            order: 0
        }
    });

    useEffect(() => {
        setExistingImages(bannerImage);
    }, []);

    const onSubmit = async (data: any) => {
        if (bannerImage.length === 0) {
            return toast.error("La imagen es obligatoria");
        }
        
        if (!data.title || !data.title.trim()) {
            return toast.error("El título es obligatorio");
        }
        
        if (!data.link || !data.link.trim()) {
            return toast.error("El enlace es obligatorio");
        }

        setUploading(true);
        try {
            let imageUrl = bannerImage[0].url;

            // Si la imagen es un blob/local file, subirla primero
            const first = bannerImage[0] as any;
            if (first?.file && first.isBlob) {
                const uploadRes = await uploadImages([first.file], 'banners');
                if (uploadRes && uploadRes[0]) {
                    imageUrl = uploadRes[0].url;
                }
            }

            const payload = {
                title: data.title.trim(),
                subtitle: data.subtitle?.trim() || '',
                imageUrl,
                link: data.link.trim(),
                order: parseInt(data.order) || 0,
                isActive: data.isActive ?? true,
                filename: bannerImage[0].filename
            };

            if (banner && banner._id) {
                await updateBanner(banner._id, payload);
                toast.success('Banner actualizado correctamente');
            } else {
                await addBanner(payload);
                toast.success('Banner creado correctamente');
            }

            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar banner");
        } finally {
            setUploading(false);
        }
    };

    const handleImagesChange = useCallback((newImages: ProductImage[]) => {
        setBannerImage(newImages);
    }, []);

    return (
        <dialog className="modal modal-open">
            <form className="modal-box w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg mb-4">{banner ? 'Editar Banner' : 'Crear Banner'}</h3>

                <div className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Título <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Título del banner"
                            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                            {...register("title", { 
                                required: "El título es obligatorio",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" }
                            })}
                        />
                        {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Subtítulo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Subtítulo del banner (opcional)"
                            className="input input-bordered w-full"
                            {...register("subtitle")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Enlace <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://ejemplo.com o /category/ruta"
                            className={`input input-bordered w-full ${errors.link ? 'input-error' : ''}`}
                            {...register("link", { 
                                required: "El enlace es obligatorio",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" }
                            })}
                        />
                        {errors.link && <span className="text-error text-sm">{errors.link.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Imagen <span className="text-red-500">*</span> (Recomendado: 1920x600)
                            </span>
                        </label>
                        <ImageUpload
                            maxImages={1}
                            onImagesChange={handleImagesChange}
                            initialImages={bannerImage}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Orden</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                placeholder="0"
                                {...register("order")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    defaultChecked={true}
                                    {...register("isActive")}
                                />
                                <span className="label-text ml-2">Activo</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="btn btn-primary"
                    >
                        {uploading ? <><FaSpinner className="animate-spin mr-2" />Guardando...</> : 'Guardar Banner'}
                    </button>
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default BannerModal