import { useState } from 'react'
import AuthButtons from './AuthButtons'
import Cart from './Cart'
import Wishlist from './Wishlist'
import UserDropDown from './UserDropDown'
import { useUser } from '../../Context/UserContext'
import type { UserContextType } from '../../Interfaces/UserContextType'
import { Link, useNavigate } from 'react-router'
import { FaUser, FaUserPlus } from 'react-icons/fa'

const Navbar = () => {
    const { loading, userInfo } = useUser() as UserContextType
    const [searchQuery, setSearchQuery] = useState('')
    const [showMobileSearch, setShowMobileSearch] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const navigate = useNavigate()

    const doSearch = () => {
        const q = (searchQuery || '').trim()
        if (!q) return
        navigate(`/search?name=${encodeURIComponent(q)}`)
        setShowMobileSearch(false) // Ocultar barra de búsqueda en móvil después de buscar
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') doSearch()
    }

    return (
        <header className="sticky top-0 z-50">
            {/* Navbar principal */}
            <nav className="navbar bg-white shadow-md lg:shadow-sm w-full min-h-[70px] px-4 md:px-6">
                
                {/* Logo - Izquierda */}
                <div className="navbar-start w-auto md:w-1/4 lg:w-1/5">
                    <Link className="btn btn-ghost p-0 hover:bg-transparent" to="/">
                        <img 
                            className='h-10 md:h-12 lg:h-14 w-auto object-contain' 
                            src='/uploads/logo_text.png'
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Barra de búsqueda - Centro (Desktop) */}
                <div className="navbar-center hidden md:flex md:w-2/4 lg:w-3/5 px-4">
                    <div className="form-control w-full max-w-2xl">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Buscar productos..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={onKeyDown}
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button 
                                type="button" 
                                onClick={doSearch} 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Iconos y botones - Derecha (Desktop) */}
                <div className="navbar-end hidden md:flex md:w-1/4 lg:w-1/5 gap-2 lg:gap-4">
                    {/* Botón Administrar (solo admin) */}
                    {userInfo?.isAdmin && (
                        <Link
                            to="/admin/dashboard/products"
                            className="btn btn-primary btn-sm lg:btn-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin
                        </Link>
                    )}

                    {/* Lista de deseos */}
                    <div className="indicator">
                        <Wishlist />
                    </div>

                    {/* Carrito de compras */}
                    <div className="indicator">
                        <Cart />
                    </div>

                    {/* Dropdown de usuario o botones de autenticación */}
                    {!loading && userInfo?.username && <UserDropDown />}
                    {!loading && !userInfo?.username && <AuthButtons />}
                </div>

                {/* Menú móvil - Derecha */}
                <div className="navbar-end md:hidden flex items-center gap-2">
                    {/* Icono de búsqueda para móvil */}
                    <button 
                        className="btn btn-ghost btn-circle"
                        onClick={() => {
                            setShowMobileSearch(!showMobileSearch)
                            setShowMobileMenu(false)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Menú hamburguesa para móvil */}
                    <div className="dropdown dropdown-end">
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-ghost btn-circle"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        {showMobileMenu && (
                            <ul 
                                tabIndex={0} 
                                className="dropdown-content menu bg-base-100 rounded-box z-[60] mt-3 w-64 p-4 shadow-lg border"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                {/* Botón Administrar para móvil (solo admin) */}
                                {userInfo?.isAdmin && (
                                    <li className="mb-3">
                                        <Link
                                            to="/admin/dashboard/products"
                                            className="btn btn-primary btn-sm w-full justify-start"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Administrar
                                        </Link>
                                    </li>
                                )}

                                {/* Lista de deseos móvil */}
                                <li className="mb-2">
                                    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
                                        <span className="font-medium">Lista de deseos</span>
                                        <Wishlist />
                                    </div>
                                </li>

                                {/* Separador */}
                                <div className="divider my-2"></div>

                                {/* Autenticación móvil */}
                                <li>
                                    {!loading && userInfo?.username ? (
                                        <div className="p-2">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-white rounded-full w-10">
                                                        <span className="text-sm">
                                                            {userInfo.username.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{userInfo.username}</p>
                                                    <p className="text-sm text-gray-500">{userInfo.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Link to="/profile" className="btn btn-outline btn-sm">
                                                    Mi perfil
                                                </Link>
                                                <Link to="/logout" className="btn btn-ghost btn-sm text-error">
                                                    Cerrar sesión
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row gap-2 hover:bg-white hover:cursor-default active:bg-white">
                                            <Link to="/login" className="btn btn-primary btn-sm h-full w-[50%]">
                                                <FaUser/>
                                            </Link>
                                            <Link to="/register" className="btn btn-outline btn-sm h-full w-[50%]">
                                                <FaUserPlus/>
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        )}
                    </div>
                    {/* Carrito móvil */}
                    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
                                        <Cart />
                                    </div>
                </div>
            </nav>

            {/* Barra de búsqueda para móvil (expandible) */}
            {showMobileSearch && (
                <div className="md:hidden bg-white border-t px-4 py-3 animate-slideDown">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Buscar productos..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button 
                            type="button" 
                            onClick={doSearch} 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar