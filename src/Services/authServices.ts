import axios from 'axios'
import type { FieldValues, UseFormReset } from 'react-hook-form'

// Configuración base de axios para autenticación
const API_URL = '/api/auth'
// http://localhost:3001/api/auth/register
// http://localhost:3001/api/auth/profile

// Para incluir la cookies en las peticiones
axios.defaults.withCredentials = true

export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener el perfil')
    }
}

export const loginService = async (data: unknown, reset: UseFormReset<FieldValues>, setRedirect: React.Dispatch<React.SetStateAction<boolean>>, setUserInfo: any) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        // Si la respuesta es exitosa
        if (response.status === 200) {
            setUserInfo(response.data)
            reset()
            setRedirect(true)
            return {
                success: true,
                message: 'Inicio de sesión exitoso',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al loguearse',
        }
    }
}

export const registerService = async (
    data: unknown,
    reset: UseFormReset<FieldValues>,
    setRedirect: React.Dispatch<React.SetStateAction<boolean>>,
    checkSession: any
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        if (response.status === 201) {
            // Verificar la sesión real del servidor después del registro
            await checkSession()
            reset()
            setRedirect(true)

            return {
                message: true,
            }
        }
    } catch (error) {
        return {
            message: false,
        }
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error.response.data.message || 'Error al cerrar la sesión'
        )
    }
}

export const googleLoginService = async (token: string, setUserInfo: any) => {
    try {
        const response = await axios.post(`${API_URL}/google`, { token }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        if (response.status === 200 || response.status === 201) {
            setUserInfo(response.data)
            return {
                success: true,
                message: 'Autenticación con Google exitosa',
                data: response.data,
            }
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error al autenticarse con Google',
        }
    }
}
