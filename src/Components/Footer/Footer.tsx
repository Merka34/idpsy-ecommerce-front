import { Link } from 'react-router'
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHeart,
} from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="anime-gradient text-white py-12 mt-16">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid principal del footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-[#feed01]">🎌</span> IDPSY SHOP <span className="text-[#feed01]">✨</span>
                        </h3>
                        <p className="text-sm text-gray-200">
                            Tu tienda de confianza para productos anime, Pokemon y cultura otaku. Ofertas especiales en Llaveros, Peluches y Cartas coleccionables.
                        </p>
                        {/* Redes Sociales */}
                        <div className="flex space-x-4 pt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#feed01] transition-all duration-300 hover:scale-125"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#feed01] transition-all duration-300 hover:scale-125"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#feed01] transition-all duration-300 hover:scale-125"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#feed01] transition-all duration-300 hover:scale-125"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#feed01] transition-all duration-300 hover:scale-125"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Navegación de compra */}
                    <div className="space-y-3">
                        <h4 className="text-[#feed01] font-bold mb-4 text-lg flex items-center gap-2">
                            <span>🛍️</span> COMPRA
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Categorías
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Ofertas 🔥
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Productos Nuevos ⭐
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Información y Ayuda */}
                    <div className="space-y-3">
                        <h4 className="text-[#feed01] font-bold mb-4 text-lg flex items-center gap-2">
                            <span>📚</span> INFORMACIÓN
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Quiénes Somos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Contáctanos
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Envíos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#feed01] transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100">→</span> Preguntas Frecuentes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h4 className="text-[#feed01] font-bold mb-4 text-lg flex items-center gap-2">
                            <span>📞</span> CONTACTO
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-[#feed01] mt-1 flex-shrink-0" />
                                <span>
                                    Calle Principal 123
                                    <br />
                                    Ciudad, País 12345
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-[#feed01] flex-shrink-0" />
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-[#feed01] transition-all duration-300"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-[#feed01] flex-shrink-0" />
                                <a
                                    href="mailto:info@idpsyshop.com"
                                    className="hover:text-[#feed01] transition-all duration-300"
                                >
                                    info@idpsyshop.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-400/30 my-8"></div>

                {/* Pie legal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center md:text-left">
                        <Link
                            to="/terms"
                            className="text-sm hover:text-[#feed01] transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group"
                        >
                            <span className="opacity-0 group-hover:opacity-100">→</span> Términos y Condiciones
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            to="/privacy"
                            className="text-sm hover:text-[#feed01] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <span className="opacity-0 group-hover:opacity-100">→</span> Política de Privacidad
                        </Link>
                    </div>
                    <div className="text-center md:text-right">
                        <a
                            href="#"
                            className="text-sm hover:text-[#feed01] transition-all duration-300 flex items-center justify-center md:justify-end gap-2 group"
                        >
                            <span className="opacity-0 group-hover:opacity-100">→</span> Política de Cookies
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-400/30 pt-8">
                    <div className="text-center text-sm text-gray-200">
                        <p>
                            &copy; {currentYear} <span className="text-[#feed01] font-bold">IDPSY SHOP</span>. Todos los derechos
                            reservados. | Diseñado con{' '}
                            <FaHeart className="inline text-[#feed01] mx-1 animate-pulse" /> por IDPSY Team
                        </p>
                        <p className="mt-2 text-xs opacity-75">
                            🌸 Tu tienda favorita de anime, Pokemon y artículos otaku 🌸
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
