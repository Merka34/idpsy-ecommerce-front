import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const BannerContext = createContext({})

export const BannerContextProvider = ({ children }) => {
    const [banners, setBanners] = useState([]);
    const [loadingBanner, setBannerLoading] = useState(false);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchBanners = async () => {
        setBannerLoading(true);
        try {
            const res = await axios.get('/api/banners');
            if (res.data?.success) setBanners(res.data.data || []);
            else setBanners([]);
        } catch (error: any) {
            console.error('Error fetching banners', error);
            setBanners([]);
        } finally {
            setBannerLoading(false);
        }
    };

    const addBanner = async (payload: any) => {
        try {
            const res = await axios.post('/api/banners', payload, { withCredentials: true, headers: getAuthHeaders() });
            if (res.data.success) {
                await fetchBanners();
            }
            return res.data;
        } catch (error: any) {
            console.error('Error creating banner', error);
            return { success: false, message: error.message || 'Error' };
        }
    };

    const updateBanner = async (id: string, payload: any) => {
        try {
            const res = await axios.patch(`/api/banners/${id}`, payload, { withCredentials: true, headers: getAuthHeaders() });
            if (res.data.success) await fetchBanners();
            return res.data;
        } catch (error: any) {
            console.error('Error updating banner', error);
            return { success: false, message: error.message || 'Error' };
        }
    };

    const changePositionBanner = async (id: string, payload: any) => {
        try {
            const res = await axios.patch(`/api/banners/${id}/pos`, payload, { withCredentials: true, headers: getAuthHeaders() });
            if (res.data.success) await fetchBanners();
            return res.data;
        } catch (error: any) {
            console.error('Error updating banner', error);
            return { success: false, message: error.message || 'Error' };
        }
    };

    const toggleStatus = async (id: string) => {
        try {
            const res = await axios.patch(`/api/banners/${id}/toggle`, null, { withCredentials: true, headers: getAuthHeaders() });
            if (res.data.success) {
                setBanners(prevBanners => prevBanners.map((b: any) => b._id === id ? { ...b, isActive: !b.isActive } : b));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("No se pudo cambiar el estado del banner");
        }
    };

    const deleteBanner = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar este banner?")) return;

        try {
            const res = await axios.delete(`/api/banners/${id}`, { withCredentials: true, headers: getAuthHeaders() });
            if (res.data?.success) {
                setBanners(prevBanners => prevBanners.filter((b: any) => b._id !== id));
                toast.success('Banner eliminado');
            } else {
                toast.error('No se pudo eliminar el banner');
            }
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    return (
        <BannerContext.Provider value={{ banners, loadingBanner, loading: loadingBanner, fetchBanners, addBanner, updateBanner, toggleStatus, deleteBanner, changePositionBanner }}>
            {children}
        </BannerContext.Provider>
    );
};

export const useBanner = () => useContext(BannerContext);