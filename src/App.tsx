import { Routes, Route } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { UserContextProviver } from './Context/UserContext'
import { ProductContextProvider } from './Context/ProductContext'
import { CartContextProvider } from './Context/CartContext'
import { BannerContextProvider } from './Context/BannerContext'
import { Toaster } from 'react-hot-toast'
import DetailProduct from './Pages/Product'
import AdminDashboard from './Pages/AdminDashboard'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Checkout from './Pages/Checkout'
import PaymentSuccess from './Pages/PaymentSuccess'
import PaymentFailure from './Pages/PaymentFailure'
import PaymentPending from './Pages/PaymentPending'
import Search from './Pages/Search'
function App() {
    return (
        <UserContextProviver>
            <ProductContextProvider>
                <CartContextProvider>
                    <BannerContextProvider>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/search" element={<Search />} />
                                <Route
                                    path="/product/:id"
                                    element={<DetailProduct />}
                                />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route
                                    path="/payment/success"
                                    element={<PaymentSuccess />}
                                />
                                <Route
                                    path="/payment/failure"
                                    element={<PaymentFailure />}
                                />
                                <Route
                                    path="/payment/pending"
                                    element={<PaymentPending />}
                                />
                                <Route
                                    path="/admin/dashboard/*"
                                    element={
                                        <ProtectedRoute>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </BannerContextProvider>
                </CartContextProvider>
            </ProductContextProvider>
            <Toaster />
        </UserContextProviver>
    )
}

export default App
