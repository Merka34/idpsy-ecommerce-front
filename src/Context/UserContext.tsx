import { useContext, useState, useEffect, createContext } from 'react'
import { getProfileService } from '../Services/authServices'

export const UserContext = createContext({})

export const UserContextProviver = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    // Funcion para verificar la sesión del usuario
    const checkSession = async () => {
        try {
            setLoading(true)
            const userData = await getProfileService()
            setUserInfo(userData)
        } catch (error) {
            setUserInfo({})
        } finally {
            setLoading(false)
        }
    }

    // Funcion para obtener el id del usuario authenticado
    const getUserId = () => {
        return (userInfo as any)?.id || null
    }

    // Verificar si el usuario está autenticado o no
    const isAuthenticated = () => {
        return !!(userInfo as any)?.id
    }

    useEffect(() => {
        checkSession()
    }, [])

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                loading,
                checkSession,
                getUserId,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
