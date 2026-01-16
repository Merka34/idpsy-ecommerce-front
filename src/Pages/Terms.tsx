const Terms = () => {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="anime-gradient rounded-3xl p-12 mb-12 text-center text-white slide-up">
                    <div className="text-5xl mb-4">⚖️</div>
                    <h1 className="text-5xl font-bold mb-4">Términos y Condiciones</h1>
                    <p className="text-lg opacity-90">
                        Por favor, lee cuidadosamente nuestros términos antes de utilizar nuestros servicios
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
                            Bienvenido a IDPSY SHOP. Estos Términos y Condiciones rigen el uso de nuestro sitio web y servicios. Al acceder y utilizar nuestro sitio, usted acepta estar vinculado por estos términos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">2. 📋 Uso del Sitio</h2>
                        <p>Usted se compromete a usar este sitio solo para fines legales y no para:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Violar leyes o regulaciones aplicables</li>
                            <li>Infringir derechos de propiedad intelectual</li>
                            <li>Transmitir contenido ofensivo o ilegal</li>
                            <li>Interferir con el funcionamiento del sitio</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-[#feed01]/5 p-6 rounded-2xl border-l-4 border-[#feed01]">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">3. 🛍️ Productos y Precios</h2>
                        <p>
                            Los precios de los productos están sujetos a cambio sin previo aviso. Nos reservamos el derecho de modificar, suspender o descontinuar cualquier producto en cualquier momento. La disponibilidad del producto se confirma al momento de la compra.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">4. 👤 Cuentas de Usuario</h2>
                        <p>
                            Si crea una cuenta en nuestro sitio, usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades bajo su cuenta. Usted acepta notificarnos inmediatamente de cualquier uso no autorizado.
                        </p>
                    </section>

                    <section className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">5. ⚠️ Limitación de Responsabilidad</h2>
                        <p>
                            IDPSY SHOP no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de usar nuestros servicios.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">6. 🔄 Política de Devoluciones</h2>
                        <p>
                            Los productos pueden ser devueltos dentro de 30 días desde la compra si están en condición original y sin usar. Las devoluciones deben ser solicitadas a través de nuestro formulario de contacto.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">7. 🔐 Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido en nuestro sitio, incluyendo texto, gráficos, logotipos e imágenes, es propiedad de IDPSY SHOP o sus proveedores de contenido y está protegido por leyes de derechos de autor.
                        </p>
                    </section>

                    <section className="mb-8 bg-[#3e5275]/5 p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">8. 📝 Cambios en los Términos</h2>
                        <p>
                            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán efectivos cuando se publiquen en el sitio.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#3e5275] mb-4">9. 📞 Contacto</h2>
                        <p>
                            Si tiene preguntas sobre estos Términos y Condiciones, póngase en contacto con nosotros en: <strong className="text-[#feed01]">info@idpsyshop.com</strong>
                        </p>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center anime-gradient-soft rounded-3xl p-8 border border-[#feed01]">
                    <p className="text-gray-700 mb-4">Si estás de acuerdo con estos términos, estás listo para empezar a comprar</p>
                    <a href="/" className="btn btn-lg bg-[#3e5275] hover:bg-[#feed01] text-white hover:text-[#3e5275] border-0 font-bold">
                        🛍️ Volver a la Tienda
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Terms
