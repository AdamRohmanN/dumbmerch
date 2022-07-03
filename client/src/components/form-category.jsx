import Navbar from "./molecules/navbar";
import "./form.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query"
import { API } from "../config/api";

export function AddCategory() {
    document.title = "Admin | Category"

    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [category, setCategory] = useState('')

    const handleChange = (e) => {
        setCategory(e.target.value)
    }
    
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: { "Content-type": "application/json" }
            }
            const body = JSON.stringify({ name: category })

            await API.post("/category", body, config)

            setMessage(null)
            navigate('/admin-category')
        } catch (error) {
            setMessage(
                <span style={{color: "#F74D4D"}}>{error.response.data.message} !</span>
            )
            console.log(error);
        }
    })
    return (
        <>
        <Navbar />
        <main className="input-page">
            <h3 className="h3-input">Add Category {message}</h3>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <input className="input-form"
                    type="text"
                    name="category" value={category}
                    placeholder="Category name"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="input-button">Add</button>
            </form>
        </main>
        </>
    )
}

export function EditCategory() {
    document.title = "Admin | Category"

    const navigate = useNavigate()
    const {id} = useParams()
    const [message, setMessage] = useState(null)
    const [category, setCategory] = useState({ name: "" })

    let { refecth } = useQuery("categoryCache", async () => {
        const response = await API.get(`/category/${id}`)
        setCategory({ name: response.data.data.category.name })
    })

    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: { "Content-type": "application/json" }
            }
            const body = JSON.stringify(category)

            await API.patch(`/category/`+id, body, config)
            navigate('/admin-category')
        } catch (error) {
            setMessage(
                <span style={{color: "#F74D4D"}}>{error.response.data.message} !</span>
            )
            console.log(error);
        }
    })
    return (
        <>
        <Navbar />
        <main className="input-page">
            <h3 className="h3-input">Edit Category {message}</h3>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <input className="input-form"
                    type="text"
                    placeholder="Category name"
                    name="category" value={category.name}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="input-button">Save</button>
            </form>
        </main>
        </>
    )
}

export default { AddCategory, EditCategory }