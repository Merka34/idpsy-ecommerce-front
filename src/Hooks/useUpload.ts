// frontend/hooks/useUpload.js
import { useState } from 'react';
import axios from 'axios';

export const useUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // productId (optional): namespace filenames to a product to avoid collisions
    const uploadImages = async (files: FileList | File[], productId?: string) => {
        // 1. Creamos el contenedor multipart/form-data
        const formData = new FormData();

        // 2. Agregamos cada archivo al contenedor
        // IMPORTANTE: El nombre 'images' debe coincidir con upload.array('images', 10) en Node
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        setUploading(true);
        setProgress(0);

        try {
            // 3. Enviamos la petición
            // Nota: No es necesario poner el header 'Content-Type', 
            // Axios y el navegador lo detectan automáticamente al ver el FormData.
            const url = productId ? `/api/upload/upload?productId=${encodeURIComponent(productId)}` : '/api/upload/upload';
            const response = await axios.post(url, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 100)
                    );
                    setProgress(percentCompleted);
                },
            });

            // Devolvemos el array de objetos que el backend generó (con las URLs relativas)
            return response.data.data; 

        } catch (error: any) {
            console.error('Error uploading images:', error);
            throw new Error(error.response?.data?.message || 'Error al subir imágenes');
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = async (filename: string) => {
        try {
            // Enviar cookie/credentials y, si existe, token en header
            const token = localStorage.getItem('accessToken');
            console.log(token)
            await axios.delete(`/api/upload/${encodeURIComponent(filename)}`, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return true;
        } catch (error: any) {
            console.error('Error deleting image:', error?.response || error);
            throw new Error(error.response?.data?.message || 'Error al eliminar la imagen');
        }
    };

    return {
        uploadImages,
        deleteImage,
        uploading,
        progress
    };
};