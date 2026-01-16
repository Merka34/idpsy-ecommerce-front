import { Routes, Route } from 'react-router'
import TableProductDashboard from '../Components/AdminDashboard/TableProductDashboard/TableProductDashboard'
import DashboardLayout from '../Layout/DashboardLayout'
import CreateProduct from './AdminCreateProduct'
import UpdateProduct from './AdminUpdateProducts'
import AdminBanners from './AdminBanners'

const AdminDashboard = () => {
    return (
        <section>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<TableProductDashboard />} />
                    <Route
                        path="products"
                        element={<TableProductDashboard />}
                    />
                    <Route
                        path="products/createProduct"
                        element={<CreateProduct />}
                    />
                    <Route
                        path="products/updateProduct/:id"
                        element={<UpdateProduct />}
                    />
                    <Route
                        path="banners"
                        element={<AdminBanners />}
                    />
                </Route>
            </Routes>
        </section>
    )
}

export default AdminDashboard
