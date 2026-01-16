import { Link } from 'react-router'
import { useProduct } from '../../../Context/ProductContext'
import toast from 'react-hot-toast'
import { FaEdit, FaEraser } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useEffect } from 'react'

const TableProducts = ({ products }) => {
    const { productsLoading, deleteProduct, getProducts } = useProduct()

    const onHandleDelete = async (id: any) => {
        const result = await deleteProduct(id)

        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    useEffect(() => {
        getProducts(); // Esto refresca la lista cada vez que entras a la pantalla
    }, [getProducts]);

    return (<div>
        {
            productsLoading ? <div></div> 
                                :
                                <table className="table text-center">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {!productsLoading && products.map((product: any, index: number) => (
                    <tr key={`${product._id}-${index}`}>
                        <th>{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td><img className='h-[80px]' src={product.images[0]}/></td>
                        <td>
                            <Link
                                to={`/admin/dashboard/products/updateProduct/${product._id}`}
                                className="btn btn-info"
                            >
                                <FaEdit/>
                            </Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-error"
                                onClick={() => onHandleDelete(product._id)}
                            >
                                <FaEraser/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        }
        </div>
    )
}

export default TableProducts
