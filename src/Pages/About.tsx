import { FaHeart, FaUsers, FaStar, FaMountain } from 'react-icons/fa'

const About = () => {
    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Quiénes Somos
                </h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nuestra Historia
                    </h2>
                    <p className="text-gray-700 mb-4">
                        IDPSY SHOP fue fundada con la pasión de crear una
                        experiencia de compra única y memorable. Nuestro
                        objetivo es proporcionar productos de alta calidad que
                        traigan alegría y entretenimiento a nuestros clientes.
                    </p>
                    <p className="text-gray-700">
                        Comenzamos como un pequeño emprendimiento y hemos
                        crecido hasta convertirse en una tienda en línea
                        confiable, ofreciendo productos cuidadosamente
                        seleccionados como llaveros decorativos, peluches
                        adorables y cartas coleccionables.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaHeart className="h-6 w-6 text-red-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Pasión por la Calidad
                                </h3>
                                <p className="text-gray-700">
                                    Cada producto es seleccionado cuidadosamente
                                    para garantizar la mejor calidad y
                                    satisfacción de nuestros clientes.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaUsers className="h-6 w-6 text-blue-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Comunidad
                                </h3>
                                <p className="text-gray-700">
                                    Creemos en construir una comunidad de
                                    clientes leales que comparten nuestros
                                    valores de diversión y autenticidad.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaMountain className="h-6 w-6 text-green-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Responsabilidad
                                </h3>
                                <p className="text-gray-700">
                                    Nos comprometemos a actuar con integridad y
                                    transparencia en todas nuestras operaciones
                                    comerciales.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <FaStar className="h-6 w-6 text-yellow-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Excelencia
                                </h3>
                                <p className="text-gray-700">
                                    Nos esforzamos por superar expectativas en
                                    cada aspecto de nuestro servicio al cliente.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nuestro Equipo
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Contamos con un equipo dedicado y apasionado de
                        profesionales comprometidos en ofrecer la mejor
                        experiencia de compra. Desde nuestro equipo de curaduría
                        de productos hasta nuestro servicio al cliente, todos
                        trabajan juntos para lograr tu satisfacción.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nuestros Productos
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Ofrecemos una cuidada selección de productos en tres
                        categorías principales:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                            <strong>Llaveros:</strong> Accesorios únicos y
                            funcionales para llevar tu estilo a todas partes
                        </li>
                        <li>
                            <strong>Peluches:</strong> Adorables compañeros
                            suaves perfectos para coleccionar o regalar
                        </li>
                        <li>
                            <strong>Cartas Coleccionables:</strong> Ediciones
                            especiales para coleccionistas y entusiastas
                        </li>
                    </ul>
                </section>

                <section className="bg-blue-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nuestra Misión
                    </h2>
                    <p className="text-gray-700">
                        Nuestra misión es proporcionar a nuestros clientes
                        productos de alta calidad que traigan alegría, nostalgia
                        y satisfacción. Queremos ser tu tienda en línea de
                        confianza, conocida por la excelencia, la integridad y
                        la atención al cliente excepcional.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default About
