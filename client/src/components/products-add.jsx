import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query"
import { API } from "../config/api"
import Navbar from "./molecules/navbar";
import "./form.css";
import CheckBox from "./molecules/check-category";

export default function AddProduct() {
    document.title = "Admin | Product"

    const navigate = useNavigate()
    const [message, setMessage] = useState(null)

    const [categories, setCategories] = useState([]) //store all category data
    const [categoryId, setCategoryId] = useState([]) //save the selected category id
    const [preview, setPreview] = useState(null) //image preview
    const [form, setForm] = useState({ //store product data
        image: '', name: '', desc: '', price: '', qty: ''
    })

    const getCategories = async () => {
        try {
            const response = await API.get('/categories')
            setCategories(response.data.data.categories)
        } catch (error) {
            console.log(error);
        }
    }
    const handleChangeCategoryId = (e) => {
        const id = e.target.value
        const checked = e.target.checked

        if (checked) {
            setCategoryId([...categoryId, parseInt(id)])
        } else {
            let newCategoryId = categoryId.filter((categoryIdItem) => {
            return categoryIdItem !== id
            })
            setCategoryId(newCategoryId)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value
        })

        if (e.target.type === 'file') { //image url for preview
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {'Content-type': 'multipart/form-data'}
            }

            const formData = new FormData() //store data as object
            formData.set('image', form.image[0], form.image[0].name)
            formData.set('name', form.name)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)
            formData.set('categoryId', categoryId)

            await API.post('/product', formData, config)

            setMessage(null)
            navigate('/admin-product')
        } catch (error) {
            setMessage(
                <span style={{color: "#F74D4D"}}>{error.response.data.message} !</span>
            )
            console.log(error);
        }
    })

    useEffect( () => {
        getCategories()
    }, [])
    return(
        <>
        <Navbar />
        <main className="input-page">
            <h3>Add Product {message}</h3>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="upload-image">
                    <label htmlFor="upload-image">Upload Image</label>
                    <p>{preview?.slice(5, 99)}</p>
                    {preview &&
                        (<img src={preview} alt={preview} className="preview-image" />)
                    }
                </div>
                <input id="upload-image"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    hidden
                />
                <input className="input-form"
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <textarea className="input-form"
                    rows="5"
                    name="desc"
                    placeholder="desc"
                    onChange={handleChange}
                />
                <input className="input-form"
                    type="number"
                    name="price"
                    placeholder="price (Rp.)"
                    onChange={handleChange}
                />
                <input className="input-form"
                    type="number"
                    name="qty"
                    placeholder="quantity"
                    onChange={handleChange}
                />
                <div className="input-form">
                    <p>Category</p>
                    <div>
                    {categories?.map((item) => (
                        <label key={item.id} className="checkbox">
                            <CheckBox
                            value={item.id}
                            categoryId={categoryId}
                            handleChangeCategoryId={handleChangeCategoryId}
                            />
                            <span>{item.name}</span>
                        </label>
                    ))}
                    </div>
                </div>
                <button type="submit" className="input-button">Add</button>
            </form>
        </main>
        </>
    )
}