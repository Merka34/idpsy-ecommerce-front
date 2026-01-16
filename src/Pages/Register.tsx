import RegisterForm from '../Components/Register/RegisterForm'
import { FaUserPlus } from 'react-icons/fa'

const Register = () => {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-md mx-auto px-4">
                {/* Header */}
                <div className="anime-gradient rounded-3xl p-8 mb-8 text-center text-white slide-up">
                    <div className="text-5xl mb-4 flex justify-center">
                        <FaUserPlus className="animate-bounce" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Registrarse</h1>
                    <p className="text-sm opacity-90">Únete a la comunidad IDPSY 🌸</p>
                </div>

                {/* Formulario */}
                <RegisterForm />

                {/* Decoración */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-sm">
                        ¿Ya tienes cuenta?{' '}
                        <a
                            href="/login"
                            className="text-[#feed01] font-bold hover:text-[#3e5275] transition-all"
                        >
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>

                {/* Emojis decorativos */}
                <div className="flex justify-center gap-8 mt-12 text-4xl opacity-30 animate-pulse">
                    <span>🎎</span>
                    <span>✨</span>
                    <span>🎌</span>
                </div>
            </div>
        </div>
    )
}

export default Register
