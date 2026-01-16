const Privacy = () => {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="anime-gradient rounded-3xl p-12 mb-12 text-center text-white slide-up">
                    <div className="text-5xl mb-4">🔒</div>
                    <h1 className="text-5xl font-bold mb-4">Política de Privacidad</h1>
                    <p className="text-lg opacity-90">
                        Tu privacidad es importante para nosotros. Lee cómo protegemos tus datos
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <style>{`
                        .prose h2 {
                            color: #3e5275;
                            font-weight: bold;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                        }
                        .prose p, .prose li {
                            color: #4b5563;
                            line-height: 1.8;
                        }
                        .prose ul {
                            color: #4b5563;
                        }
                        .prose strong {
                            color: #feed01;
                        }
                    `}</style>

                    <section className="mb-8 bg-gradient-to-r from-[#3e5275]/10 to-[#feed01]/10 p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-[#3e5275] mb-4">1. 🎌 Introducción</h2>
                        <p>
                            En IDPSY SHOP, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">2. 📊 Información que Recopilamos</h2>
                        <p>Recopilamos los siguientes tipos de información:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li><strong>Información de Cuenta:</strong> nombre, correo electrónico, contraseña</li>
                            <li><strong>Información de Envío:</strong> dirección, teléfono, ciudad, país</li>
                            <li><strong>Información de Pago:</strong> detalles de tarjeta de crédito (procesados de forma segura)</li>
                            <li><strong>Historial de Compras:</strong> productos comprados, fechas, montos</li>
                            <li><strong>Datos de Navegación:</strong> página referente, navegador, dirección IP</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-[#feed01]/5 p-6 rounded-2xl border-l-4 border-[#feed01]">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">3. 🎯 Cómo Usamos tu Información</h2>
                        <p>Utilizamos tu información para:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Procesar y entregar tus pedidos</li>
                            <li>Enviarle confirmaciones y actualizaciones</li>
                            <li>Responder a tus consultas y proporcionar soporte</li>
                            <li>Mejorar nuestros servicios y experiencia del usuario</li>
                            <li>Enviarle promociones y ofertas especiales (solo con tu consentimiento)</li>
                            <li>Cumplir con obligaciones legales</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">4. 🍪 Cookies</h2>
                        <p>
                            Nuestro sitio utiliza cookies para mejorar tu experiencia de navegación. Las cookies son pequeños archivos almacenados en tu dispositivo. Puedes controlar o deshabilitar las cookies a través de la configuración de tu navegador.
                        </p>
                    </section>

                    <section className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">5. 🔐 Seguridad de Datos</h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">6. 👥 Compartir Información</h2>
                        <p>
                            No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto cuando:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Es necesario para procesar tus pedidos (ej: empresas de envío)</li>
                            <li>Se lo requiere por ley o autoridades gubernamentales</li>
                            <li>Has dado tu consentimiento explícito</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">7. 🗑️ Retención de Datos</h2>
                        <p>
                            Conservamos tu información personal solo durante el tiempo necesario para cumplir los propósitos para los que fue recopilada, a menos que sea requerido por ley.
                        </p>
                    </section>

                    <section className="mb-8 bg-[#3e5275]/5 p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">8. ⚖️ Tus Derechos</h2>
                        <p>
                            Tienes derecho a acceder, corregir, actualizar o eliminar tu información personal. Para ejercer estos derechos, contáctanos a <strong className="text-[#feed01]">info@idpsyshop.com</strong>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">9. 📋 Cambios en esta Política</h2>
                        <p>
                            Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios serán publicados en esta página con una fecha de actualización.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">10. 📞 Contacto</h2>
                        <p>
                            Si tienes preguntas sobre nuestra Política de Privacidad, contáctanos en: <strong className="text-[#feed01]">info@idpsyshop.com</strong>
                        </p>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center anime-gradient-soft rounded-3xl p-8 border border-[#feed01]">
                    <p className="text-gray-700 mb-4">Nuestro compromiso es proteger tu privacidad mientras disfrutas comprando</p>
                    <a href="/" className="btn btn-lg bg-[#3e5275] hover:bg-[#feed01] text-white hover:text-[#3e5275] border-0 font-bold">
                        🛍️ Volver a la Tienda
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Privacy
