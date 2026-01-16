import { useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { FaGoogle } from 'react-icons/fa'
import { googleLoginService } from '../../Services/authServices'
import { useUser } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

interface GoogleSignInProps {
    onSuccess?: () => void
    redirectPath?: string
}

const GoogleSignInComponent = ({ onSuccess, redirectPath = '/' }: GoogleSignInProps) => {
    const { setUserInfo } = useUser()
    const navigate = useNavigate()

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const result = await googleLoginService(credentialResponse.credential, setUserInfo)
            if (result && result.success) {
                toast.success('¡Autenticación con Google exitosa!')
                if (onSuccess) onSuccess()
                navigate(redirectPath)
            } else {
                toast.error(result?.message || 'Error en autenticación con Google')
            }
        } catch (error) {
            toast.error('Error en autenticación con Google')
            console.error('Google auth error:', error)
        }
    }

    const handleGoogleError = () => {
        toast.error('Error al autenticarse con Google')
    }

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                size="large"
                theme="outline"
            />
        </GoogleOAuthProvider>
    )
}

export default GoogleSignInComponent
