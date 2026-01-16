import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

const Layout = () => {
    return (
        <>
            <div className="w-full max-w-[1000px] lg:max-w-[100vw] mx-auto px-6 pb-10">
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Layout
