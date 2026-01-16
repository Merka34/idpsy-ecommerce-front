import { Routes, Route } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { UserContextProviver } from './Context/UserContext'
import { ProductContextProvider } from './Context/ProductContext'
import { CartContextProvider } from './Context/CartContext'
import { WishlistContextProvider } from './Context/WishlistContext'
import { CategoryContextProvider } from './Context/CategoryContext'
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
import CategorySearch from './Pages/CategorySearch'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import About from './Pages/About'
import Contact from './Pages/Contact'
function App() {
    return (
        <UserContextProviver>
            <ProductContextProvider>
                <CartContextProvider>
                    <WishlistContextProvider>
                        <CategoryContextProvider>
                            <BannerContextProvider>
                                <Routes>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/search" element={<Search />} />
                                    <Route path="/categories" element={<CategorySearch />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/terms" element={<Terms />} />
                                    <Route path="/privacy" element={<Privacy />} />
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
                        </CategoryContextProvider>
                    </WishlistContextProvider>
                </CartContextProvider>
            </ProductContextProvider>
            <Toaster />
        </UserContextProviver>
    )
}

export default App
