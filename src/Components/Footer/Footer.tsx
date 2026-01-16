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
} from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid principal del footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold mb-4">
                            IDPSY SHOP
                        </h3>
                        <p className="text-sm text-gray-400">
                            Tu tienda en línea para productos únicos y de calidad.
                            Ofertas especiales en Llaveros, Peluches y Cartas
                            coleccionables.
                        </p>
                        {/* Redes Sociales */}
                        <div className="flex space-x-4 pt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500 transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-500 transition-colors duration-300"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Navegación de compra */}
                    <div className="space-y-3">
                        <h4 className="text-white font-semibold mb-4">
                            COMPRA
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Ofertas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Productos Nuevos
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Información y Ayuda */}
                    <div className="space-y-3">
                        <h4 className="text-white font-semibold mb-4">
                            INFORMACIÓN
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Quiénes Somos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Contáctanos
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Envíos y Devoluciones
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Preguntas Frecuentes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold mb-4">
                            CONTACTO
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                                <span>
                                    Calle Principal 123
                                    <br />
                                    Ciudad, País 12345
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-blue-500 flex-shrink-0" />
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                                <a
                                    href="mailto:info@idpsyshop.com"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    info@idpsyshop.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-700 my-8"></div>

                {/* Pie legal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <Link
                            to="/terms"
                            className="text-sm hover:text-white transition-colors duration-300"
                        >
                            Términos y Condiciones
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/privacy"
                            className="text-sm hover:text-white transition-colors duration-300"
                        >
                            Política de Privacidad
                        </Link>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="text-sm hover:text-white transition-colors duration-300"
                        >
                            Política de Cookies
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="text-center text-sm text-gray-400">
                        <p>
                            &copy; {currentYear} IDPSY SHOP. Todos los derechos
                            reservados. | Diseñado con{' '}
                            <span className="text-red-500">❤</span> por IDPSY
                            Team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
