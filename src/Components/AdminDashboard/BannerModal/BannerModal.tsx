import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { useBanner } from '../../../Context/BannerContext';
import { useUpload } from '../../../Hooks/useUpload';

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
    const [bannerImage, setBannerImage] = useState<any[]>(banner ? [{ url: banner.imageUrl, filename: banner.filename || '', originalName: banner.title, isBlob: false }] : []);
    const [removedImages, setRemovedImages] = useState<ProductImage[]>([]);
    const [existingImages, setExistingImages] = useState<ProductImage[]>([]);

    const { register, handleSubmit } = useForm({ defaultValues: banner || {} });

    const onSubmit = async (data: any) => {
        if (bannerImage.length === 0) return toast.error("La imagen es obligatoria");
        setUploading(true);
        try {
            let imageUrl = bannerImage[0].url;

            // Si la imagen es un blob/local file, subirla primero
            const first = bannerImage[0] as any;
            if (first?.file) {
                const uploadRes = await uploadImages([first.file], 'banners');
                const uploaded = uploadRes && uploadRes[0];
                imageUrl = uploaded?.url || imageUrl;
            }

            

            const payload = {
                ...data,
                imageUrl,
                isActive: data.isActive ?? true
            };

            // 3) Eliminar en servidor las imágenes marcadas para borrado
        if (removedImages.length > 0) {
            for (const rem of removedImages) {
                try {
                    await deleteImage(rem.filename);
                } catch (err) {
                    console.error('Error eliminando imagen en servidor:', err);
                }
            }
        }

            if (banner && banner._id) {
                await updateBanner(banner._id, payload);
                toast.success('Banner actualizado');
            } else {
                await addBanner(payload);
                toast.success('Banner creado');
            }

            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar banner");
        } finally {
            setUploading(false);
        }
    };

    const handleImagesChange = useCallback((newImages: any[]) => {
            // Actualizamos estados locales y el formulario.
            // Detectar imágenes existentes que fueron removidas para borrarlas al guardar.
            const removed = existingImages.filter(e => !newImages.some(n => n.url === e.url));
            setRemovedImages(removed);
    
            setBannerImage(newImages);
        }, [setBannerImage, existingImages]);

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-lg mb-4">{banner ? 'Editar Banner' : 'Agregar Nuevo Banner'}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="form-control">
                        <label className="label">Imagen del Banner (Recomendado: 1920x600)</label>
                        <ImageUpload 
                            maxImages={1} 
                            initialImages={bannerImage} 
                            onImagesChange={handleImagesChange/*onImagesChange={(imgs) => setBannerImage(imgs)} */}
                            
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">Título</label>
                            <input {...register('title')} className="input input-bordered" placeholder="Ej: Ofertas de Verano" defaultValue={banner?.title || ''} />
                        </div>
                        <div className="form-control">
                            <label className="label">Orden</label>
                            <input type="number" {...register('order')} className="input input-bordered" defaultValue={banner?.order ?? 0} />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Enlace (URL o Ruta)</label>
                        <input {...register('link')} className="input input-bordered" placeholder="Ej: /category/laptops" defaultValue={banner?.link || ''} />
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="checkbox" {...register('isActive')} defaultChecked={banner?.isActive ?? true} className="checkbox checkbox-primary mr-2" />
                            Activo
                        </label>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">Cancelar</button>
                        <button type="submit" className={`btn btn-primary ${uploading ? 'loading' : ''}`}>Guardar Banner</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BannerModal