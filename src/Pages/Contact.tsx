import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulamos el envío del formulario
            // En producción, esto debería enviarse a un endpoint backend
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success(
                '¡Mensaje enviado exitosamente! Nos contactaremos pronto.'
            )
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            })
        } catch {
            toast.error('Error al enviar el mensaje. Intenta nuevamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                    Contáctanos
                </h1>
                <p className="text-xl text-gray-600 text-center mb-12">
                    Estamos aquí para ayudarte. Cuéntanos cómo podemos asistirte.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Información de Contacto
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Puedes comunicarte con nosotros a través de los
                                siguientes canales:
                            </p>
                        </div>

                        {/* Dirección */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaMapMarkerAlt className="h-6 w-6 text-blue-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Ubicación
                                </h3>
                                <p className="text-gray-600">
                                    Calle Principal 123
                                    <br />
                                    Ciudad, País 12345
                                </p>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaPhone className="h-6 w-6 text-green-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Teléfono
                                </h3>
                                <a
                                    href="tel:+1234567890"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaEnvelope className="h-6 w-6 text-red-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Correo Electrónico
                                </h3>
                                <a
                                    href="mailto:info@idpsyshop.com"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    info@idpsyshop.com
                                </a>
                                <br />
                                <a
                                    href="mailto:soporte@idpsyshop.com"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    soporte@idpsyshop.com
                                </a>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaClock className="h-6 w-6 text-purple-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Horario de Atención
                                </h3>
                                <p className="text-gray-600">
                                    Lunes - Viernes: 9:00 AM - 6:00 PM
                                    <br />
                                    Sábado: 10:00 AM - 4:00 PM
                                    <br />
                                    Domingo: Cerrado
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Envíanos un Mensaje
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Teléfono (Opcional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+1 234 567-890"
                                />
                            </div>

                            {/* Asunto */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Asunto *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">
                                        Selecciona un asunto
                                    </option>
                                    <option value="consulta">
                                        Consulta General
                                    </option>
                                    <option value="soporte">
                                        Soporte Técnico
                                    </option>
                                    <option value="orden">
                                        Sobre mi Orden
                                    </option>
                                    <option value="devolucion">
                                        Devolución/Cambio
                                    </option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mensaje *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                ></textarea>
                            </div>

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            >
                                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sección adicional de FAQ rápido */}
                <div className="mt-16 bg-blue-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Preguntas Frecuentes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                ¿Cuál es el tiempo de entrega?
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Los pedidos se entregan dentro de 5-7 días
                                hábiles. Puedes rastrear tu pedido en cualquier
                                momento desde tu cuenta.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                ¿Aceptan devoluciones?
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Sí, aceptamos devoluciones dentro de 30 días.
                                Los productos deben estar en condición original
                                y sin usar.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                ¿Qué métodos de pago aceptan?
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Aceptamos tarjetas de crédito, débito y
                                transferencia bancaria. El procesamiento es
                                seguro mediante Mercado Pago.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                ¿Cómo contacto al soporte?
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Puedes escribirnos a soporte@idpsyshop.com o
                                llamar al +1 (234) 567-890. Respondemos en
                                máximo 24 horas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
