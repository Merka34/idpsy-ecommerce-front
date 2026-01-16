import { useState, useEffect } from 'react';
import { useBanner } from '../Context/BannerContext';
import { FaPlus, FaTrash, FaLink, FaEye, FaEyeSlash } from 'react-icons/fa';
import BannerModal from '../Components/AdminDashboard/BannerModal/BannerModal';

const AdminBanners = () => {
    const { banners, loading, fetchBanners, deleteBanner, toggleStatus, updateBanner, changePositionBanner } = useBanner();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Banners</h1>
                <button 
                    onClick={() => { setEditing(null); setIsModalOpen(true); }}
                    className="btn btn-primary"
                >
                    <FaPlus className="mr-2" /> Nuevo Banner
                </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Imagen (Previsualización)</th>
                            <th>Título / Enlace</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner: any) => (
                            <tr key={banner._id}>
                                <td>{banner.order}</td>
                                <td>
                                    <div className="w-40 h-16 rounded overflow-hidden border">
                                        <img src={banner.imageUrl} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{banner.title}</div>
                                    <div className="text-sm opacity-50 flex items-center">
                                        <FaLink className="mr-1 text-xs" /> {banner.link}
                                    </div>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => toggleStatus(banner._id)}
                                        className={`badge ${banner.isActive ? 'badge-success' : 'badge-ghost'} gap-2 cursor-pointer`}
                                    >
                                        {banner.isActive ? <FaEye /> : <FaEyeSlash />}
                                        {banner.isActive ? 'Activo' : 'Inactivo'}
                                    </button>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setEditing(banner); setIsModalOpen(true); }} className="btn btn-ghost btn-xs">Editar</button>
                                        <button 
                                            onClick={() => deleteBanner(banner._id)}
                                            className="btn btn-ghost btn-xs text-error"
                                        >
                                            <FaTrash />
                                        </button>
                                        <div className="btn-group btn-group-vertical">
                                            <button disabled={banners.indexOf(banner) === 0} className="btn btn-xs" onClick={async () => { await changePositionBanner(banner._id, { order: (banner.order || 0) - 1 }); }}>▲</button>
                                            <button disabled={banners.indexOf(banner) === banners.length-1} className="btn btn-xs" onClick={async () => { await changePositionBanner(banner._id, { order: (banner.order || 0) + 1 }); }}>▼</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && <BannerModal banner={editing} onClose={() => { setIsModalOpen(false); fetchBanners(); }} />}
        </div>
    );
};

export default AdminBanners