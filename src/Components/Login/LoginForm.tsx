import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginService, googleLoginService } from '../../Services/authServices'
import { useUser } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
    })

    const { setUserInfo, userInfo } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    
    const onSubmit = async (data: any) => {
        setIsLoading(true)
        // Logueando al usuario
        const result = await loginService(data, reset, setRedirect, setUserInfo)
        setIsLoading(false)
        
        if (result && result.success) {
            toast.success(result.message)
            navigate('/admin/dashboard/products');
        } else {
            toast.error(!result ? 'Error al intentar iniciar sesión' : result.message)
        }
    }

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setIsLoading(true)
        try {
            const result = await googleLoginService(credentialResponse.credential, setUserInfo)
            if (result && result.success) {
                toast.success('¡Bienvenido!')
                navigate('/')
            } else {
                toast.error(result?.message || 'Error en autenticación con Google')
            }
        } catch (error) {
            toast.error('Error en autenticación con Google')
        } finally {
            setIsLoading(false)
        }
    }

    if (redirect && userInfo.isAdmin) {
        // return <Navigate to={"/"}/>
    }

    if (redirect && !userInfo.isAdmin) {
        return <Navigate to={'/'} />
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 bg-white p-8 rounded-3xl shadow-lg border-2 border-[#feed01]/30"
        >
            {/* Email */}
            <div>
                <label className="block text-sm font-bold text-[#3e5275] mb-2">
                    📧 Correo Electrónico
                </label>
                <input
                    {...register('email', {
                        required: 'El email es requerido',
                        pattern: {
                            value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
                            message: 'Correo electrónico inválido',
                        },
                        minLength: {
                            value: 6,
                            message: 'Mínimo 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Máximo de 2 caracteres',
                        },
                    })}
                    className={`p-3 rounded-lg border-2 w-full transition-all ${
                        errors.email
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : 'border-[#feed01] focus:ring-2 focus:ring-[#3e5275]'
                    } outline-none bg-white`}
                    autoComplete="email"
                    name="email"
                    placeholder="tu@email.com"
                    type="email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.email.message as ReactNode}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-bold text-[#3e5275] mb-2">
                    🔑 Contraseña
                </label>
                <div className="relative">
                    <input
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                                value: 6,
                                message: 'Mínimo 6 caracteres',
                            },
                            maxLength: {
                                value: 254,
                                message: 'Máximo de 254 caracteres',
                            },
                        })}
                        className={`p-3 rounded-lg border-2 w-full transition-all ${
                            errors.password
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-[#feed01] focus:ring-2 focus:ring-[#3e5275]'
                        } outline-none bg-white`}
                        autoComplete="current-password"
                        name="password"
                        placeholder="••••••"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword
                                ? 'Ocultar contraseña'
                                : 'Mostrar contraseña'
                        }
                        type="button"
                        className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3e5275] hover:text-[#feed01] transition-all"
                    >
                        {showPassword ? (
                            <FaEyeSlash size={20} />
                        ) : (
                            <FaEye size={20} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.password.message as ReactNode}
                    </p>
                )}
            </div>

            {/* Botón Iniciar Sesión */}
            <button
                disabled={isLoading}
                className="btn btn-lg bg-[#3e5275] hover:bg-[#feed01] text-white hover:text-[#3e5275] border-0 font-bold mt-4 transition-all duration-300"
                type="submit"
            >
                {isLoading ? '⏳ Iniciando...' : '✨ Iniciar Sesión'}
            </button>

            {/* Separador */}
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-[#feed01]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-600">o continúa con</span>
                </div>
            </div>

            {/* Google Login */}
            {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <div className="flex justify-center">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => toast.error('Error con Google')}
                            text="signin_with"
                            size="large"
                            theme="outline"
                        />
                    </GoogleOAuthProvider>
                </div>
            )}

            {/* Info adicional */}
            <div className="mt-4 p-4 bg-[#3e5275]/5 rounded-lg border-l-4 border-[#feed01]">
                <p className="text-xs text-gray-600 text-center">
                    🎌 Únete a la comunidad otaku de IDPSY SHOP. Compra seguro y disfruta.
                </p>
            </div>
        </form>
    )
}

export default LoginForm
