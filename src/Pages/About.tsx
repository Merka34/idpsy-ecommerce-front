import { FaDragon } from 'react-icons/fa'

const About = () => {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="anime-gradient rounded-3xl p-12 mb-12 text-center text-white slide-up">
                    <div className="text-5xl mb-4">🎌</div>
                    <h1 className="text-5xl font-bold mb-4">Quiénes Somos</h1>
                    <p className="text-lg opacity-90">
                        La historia de IDPSY SHOP - Tu tienda de anime, Pokemon y cultura otaku
                    </p>
                </div>

                {/* Nuestra Historia */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#3e5275] mb-6 flex items-center gap-3">
                                <FaDragon className="text-[#feed01]" /> Nuestra Historia
                            </h2>
                            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                                IDPSY SHOP fue fundada con la pasión de crear una experiencia de compra única y memorable. Nuestro objetivo es proporcionar productos de alta calidad que traigan alegría y entretenimiento a nuestros clientes.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Comenzamos como un pequeño emprendimiento y hemos crecido hasta convertirse en una tienda en línea confiable, ofreciendo productos cuidadosamente seleccionados como llaveros decorativos, peluches adorables y cartas coleccionables.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#feed01]/20 to-[#3e5275]/20 rounded-3xl p-8 text-center">
                            <div className="text-6xl mb-4 animate-bounce">🌸</div>
                            <p className="text-gray-700 text-sm">Desde 2020, llevando la magia del anime a tu hogar</p>
                        </div>
                    </div>
                </section>

                {/* Nuestros Valores */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-[#3e5275] mb-12 text-center">⭐ Nuestros Valores ⭐</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: '❤️',
                                title: 'Pasión por la Calidad',
                                description: 'Cada producto es seleccionado cuidadosamente para garantizar la mejor calidad y satisfacción de nuestros clientes.',
                                color: 'from-red-50 to-pink-50'
                            },
                            {
                                icon: '👥',
                                title: 'Comunidad Otaku',
                                description: 'Creemos en construir una comunidad de clientes leales que comparten nuestros valores de diversión y autenticidad.',
                                color: 'from-blue-50 to-purple-50'
                            },
                            {
                                icon: '🎯',
                                title: 'Responsabilidad',
                                description: 'Nos comprometemos a actuar con integridad y transparencia en todas nuestras operaciones comerciales.',
                                color: 'from-green-50 to-emerald-50'
                            },
                            {
                                icon: '✨',
                                title: 'Excelencia',
                                description: 'Nos esforzamos por superar expectativas en cada aspecto de nuestro servicio al cliente.',
                                color: 'from-yellow-50 to-orange-50'
                            }
                        ].map((value, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 border-l-4 border-[#feed01] hover:shadow-lg transition-all duration-300`}>
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-2xl font-bold text-[#3e5275] mb-3">{value.title}</h3>
                                <p className="text-gray-700">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nuestro Equipo */}
                <section className="mb-16 anime-gradient rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <span>👨‍💼</span> Nuestro Equipo
                    </h2>
                    <p className="text-lg opacity-90 mb-4">
                        Contamos con un equipo dedicado y apasionado de profesionales comprometidos en ofrecer la mejor experiencia de compra. Desde nuestro equipo de curaduría de productos hasta nuestro servicio al cliente, todos trabajan juntos para lograr tu satisfacción.
                    </p>
                    <p className="text-sm opacity-75 mt-4">
                        🎌 Cada miembro del equipo es un fanático del anime y la cultura otaku
                    </p>
                </section>

                {/* Nuestros Productos */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-[#3e5275] mb-8 text-center">🛍️ Nuestros Productos</h2>
                    <p className="text-gray-700 text-center text-lg mb-8">
                        Ofrecemos una cuidada selección de productos en tres categorías principales:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                emoji: '🎎',
                                title: 'Llaveros',
                                desc: 'Accesorios únicos y funcionales para llevar tu estilo anime a todas partes'
                            },
                            {
                                emoji: '🧸',
                                title: 'Peluches',
                                desc: 'Adorables compañeros suaves perfectos para coleccionar o regalar'
                            },
                            {
                                emoji: '🃏',
                                title: 'Cartas Coleccionables',
                                desc: 'Ediciones especiales para coleccionistas y entusiastas de trading cards'
                            }
                        ].map((prod, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 hover:glow-effect transition-all duration-300">
                                <div className="text-5xl mb-4">{prod.emoji}</div>
                                <h3 className="text-2xl font-bold text-[#3e5275] mb-2">{prod.title}</h3>
                                <p className="text-gray-600">{prod.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Misión */}
                <section className="relative rounded-3xl overflow-hidden">
                    <div className="anime-gradient-soft rounded-3xl p-12 border-2 border-[#feed01] text-center">
                        <h2 className="text-4xl font-bold text-[#3e5275] mb-6">✨ Nuestra Misión</h2>
                        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                            Nuestra misión es proporcionar a nuestros clientes productos de alta calidad que traigan alegría, nostalgia y satisfacción. Queremos ser tu tienda en línea de confianza, conocida por la excelencia, la integridad y la atención al cliente excepcional. Porque creemos que el anime, Pokemon y la cultura otaku son más que un hobby, es una forma de vida.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 text-lg mb-6">¿Listo para descubrir lo mejor del anime?</p>
                    <a href="/" className="btn btn-lg bg-[#3e5275] hover:bg-[#feed01] text-white hover:text-[#3e5275] border-0 font-bold">
                        🛍️ Ver Productos
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About
