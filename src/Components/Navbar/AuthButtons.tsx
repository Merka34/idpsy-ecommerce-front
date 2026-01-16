import { Link } from 'react-router'

const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-2 flex-wrap">
            <Link className="btn btn-neutral btn-outline" to="/register">
                Registrarse
            </Link>
            <div className="hidden lg:block"></div>
            <Link className="btn btn-neutral btn-outline" to={'/login'}>
                Iniciar sesión
            </Link>
        </div>
    )
}

export default AuthButtons
