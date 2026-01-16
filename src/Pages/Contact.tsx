import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'

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
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="anime-gradient rounded-3xl p-12 mb-12 text-center text-white slide-up">
                    <div className="text-5xl mb-4">💌</div>
                    <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-lg opacity-90">
                        Estamos aquí para ayudarte. Cuéntanos cómo podemos asistirte
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#3e5275] mb-6 flex items-center gap-2">
                                <span>📞</span> Información de Contacto
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Puedes comunicarte con nosotros a través de los siguientes canales:
                            </p>
                        </div>

                        {/* Dirección */}
                        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-[#3e5275]/10 to-[#feed01]/10 border-l-4 border-[#feed01]">
                            <div className="flex-shrink-0">
                                <FaMapMarkerAlt className="h-6 w-6 text-[#3e5275] mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#3e5275] mb-2">
                                    📍 Ubicación
                                </h3>
                                <p className="text-gray-700">
                                    Calle Principal 123
                                    <br />
                                    Ciudad, País 12345
                                </p>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-[#3e5275]">
                            <div className="flex-shrink-0">
                                <FaPhone className="h-6 w-6 text-[#3e5275] mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#3e5275] mb-2">
                                    ☎️ Teléfono
                                </h3>
                                <a
                                    href="tel:+1234567890"
                                    className="text-[#3e5275] hover:text-[#feed01] font-semibold transition-all"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-[#feed01]">
                            <div className="flex-shrink-0">
                                <FaEnvelope className="h-6 w-6 text-[#3e5275] mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#3e5275] mb-2">
                                    📧 Correo Electrónico
                                </h3>
                                <a
                                    href="mailto:info@idpsyshop.com"
                                    className="text-[#3e5275] hover:text-[#feed01] transition-all block font-semibold"
                                >
                                    info@idpsyshop.com
                                </a>
                                <a
                                    href="mailto:soporte@idpsyshop.com"
                                    className="text-[#3e5275] hover:text-[#feed01] transition-all font-semibold"
                                >
                                    soporte@idpsyshop.com
                                </a>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-[#3e5275]">
                            <div className="flex-shrink-0">
                                <FaClock className="h-6 w-6 text-[#3e5275] mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#3e5275] mb-2">
                                    🕐 Horario de Atención
                                </h3>
                                <p className="text-gray-700">
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
                    <div className="bg-gradient-to-br from-[#3e5275]/5 to-[#feed01]/5 p-8 rounded-3xl border-2 border-[#feed01]">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-6 flex items-center gap-2">
                            <FaPaperPlane className="text-[#feed01]" /> Envíanos un Mensaje
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-bold text-[#3e5275] mb-2"
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
                                    className="w-full px-4 py-2 border-2 border-[#feed01] rounded-lg focus:ring-2 focus:ring-[#3e5275] focus:border-transparent bg-white"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-[#3e5275] mb-2"
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
                                    className="w-full px-4 py-2 border-2 border-[#feed01] rounded-lg focus:ring-2 focus:ring-[#3e5275] focus:border-transparent bg-white"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-bold text-[#3e5275] mb-2"
                                >
                                    Teléfono (Opcional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-[#feed01] rounded-lg focus:ring-2 focus:ring-[#3e5275] focus:border-transparent bg-white"
                                    placeholder="+1 234 567-890"
                                />
                            </div>

                            {/* Asunto */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-bold text-[#3e5275] mb-2"
                                >
                                    Asunto *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-[#feed01] rounded-lg focus:ring-2 focus:ring-[#3e5275] focus:border-transparent bg-white text-gray-700"
                                >
                                    <option value="">Selecciona un asunto</option>
                                    <option value="consulta">Consulta General</option>
                                    <option value="soporte">Soporte Técnico</option>
                                    <option value="orden">Sobre mi Orden</option>
                                    <option value="devolucion">Devolución/Cambio</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-bold text-[#3e5275] mb-2"
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
                                    className="w-full px-4 py-2 border-2 border-[#feed01] rounded-lg focus:ring-2 focus:ring-[#3e5275] focus:border-transparent bg-white resize-none"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                ></textarea>
                            </div>

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#3e5275] hover:bg-[#feed01] disabled:bg-gray-400 text-white hover:text-[#3e5275] font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sección adicional de FAQ rápido */}
                <div className="mt-16 bg-gradient-to-r from-[#3e5275]/10 to-[#feed01]/10 rounded-3xl p-12 border-2 border-[#feed01]">
                    <h2 className="text-3xl font-bold text-[#3e5275] mb-8 text-center flex items-center justify-center gap-2">
                        <span>❓</span> Preguntas Frecuentes <span>❓</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                emoji: '🚚',
                                q: '¿Cuál es el tiempo de entrega?',
                                a: 'Los pedidos se entregan dentro de 5-7 días hábiles. Puedes rastrear tu pedido en cualquier momento desde tu cuenta.'
                            },
                            {
                                emoji: '↩️',
                                q: '¿Aceptan devoluciones?',
                                a: 'Sí, aceptamos devoluciones dentro de 30 días. Los productos deben estar en condición original y sin usar.'
                            },
                            {
                                emoji: '💳',
                                q: '¿Qué métodos de pago aceptan?',
                                a: 'Aceptamos tarjetas de crédito, débito y transferencia bancaria. El procesamiento es seguro mediante Mercado Pago.'
                            },
                            {
                                emoji: '💬',
                                q: '¿Cómo contacto al soporte?',
                                a: 'Puedes escribirnos a soporte@idpsyshop.com o llamar al +1 (234) 567-890. Respondemos en máximo 24 horas.'
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                <div className="text-3xl mb-3">{faq.emoji}</div>
                                <h3 className="font-bold text-[#3e5275] mb-2">{faq.q}</h3>
                                <p className="text-gray-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
