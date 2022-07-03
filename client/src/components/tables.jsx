import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Navbar from "./molecules/navbar";
import ModalDelete from "./molecules/modal-delete"
import "./tables.css";
import { API } from "../config/api"

export function TableProduct() {
    document.title = "Admin | Product"

    const navigate = useNavigate()
    
    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data.products;
    })

    const handleEdit = (id) => {
        navigate(`/admin-product/edit/${id}`);
    }
    const handleDelete = (id) => {
        setIdDelete(id)
        handleShow()
    }

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/product/${id}`)
            refetch()
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        if (confirmDelete) {
          handleClose();
          deleteById.mutate(idDelete);
          setConfirmDelete(null);
        }
    }, [confirmDelete]);
    return (
        <>
        <Navbar />
        <main className="input-page" style={{paddingBottom: "3rem"}}>
            <div className="add-button">
                <h3>List Product</h3>
                <Link to="/admin-product/add">add product</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Photo</th>
                        <th>Product Name</th>
                        <th>Product Desc</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                    <tr key={product?.id}>
                        <td><span>{product?.id}</span></td>
                        <td>
                            <img src={product?.image} alt={product?.name} className="table-image"/>
                        </td>
                        <td><span>{product?.name}</span></td>
                        <td><span>{product?.desc}</span></td>
                        <td><span>{product?.price}</span></td>
                        <td><span>{product?.qty}</span></td>
                        <td className="action-button">
                            <div>
                                <button onClick={() => handleEdit(product?.id)}>Edit</button>
                                <button onClick={() => handleDelete(product?.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </main>
        </>
    )
}

export function TableCategory() {
    document.title = "Admin | Category"

    const navigate = useNavigate()
    
    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data.categories;
    });

    const handleEdit = (id) => {
        navigate(`/admin-category/edit/${id}`);
    }
    const handleDelete = (id) => {
        setIdDelete(id)
        handleShow()
    }

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/category/${id}`)
            refetch()
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        if (confirmDelete) {
          handleClose();
          deleteById.mutate(idDelete);
          setConfirmDelete(null);
        }
    }, [confirmDelete]);
    return (
        <>
        <Navbar />
        <main className="input-page" style={{paddingBottom: "3rem"}}>
            <div className="add-button">
                <h3>List Category</h3>
                <Link to="/admin-category/add">add Category</Link>
            </div>
            <table className="table-category">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((category) =>(
                    <tr key={category?.id}>
                        <td><span>{category?.id}</span></td>
                        <td><span>{category?.name}</span></td>
                        <td className="action-button">
                            <div style={{width: "70%"}}>
                                <button onClick={() => handleEdit(category?.id)}>Edit</button>
                                <button onClick={() => handleDelete(category?.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </main>
        </>
    )
}

export default { TableCategory, TableProduct }