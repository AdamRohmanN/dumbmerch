import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import convertRupiah from "rupiah-format"
import Navbar from "./molecules/navbar"
import "./detail.css"
import { API } from "../config/api"

export default function Detail() {
    document.title = "DumbMerch | Product"

    const [product, setProduct] = useState([])
    const params = useParams()
    
    async function getProduct() {
        const { id } = params
        const response = await API.get(`/product/${id}`)
        setProduct(response.data.data.product)
    }

    useEffect(()=> {
        getProduct()
    }, [])
    return (
        <>
        <Navbar />
        <main className="detail">
            <img src={product.image} alt={product.name} />
            <article>
                <h1>{product.name}</h1>
                <p>{product.qty}</p>
                <p>{product.desc}</p>
                <p>{product.categories}</p>
                <h3>{convertRupiah.convert(product.price)}</h3>
                <button>Buy</button>
            </article>
        </main>
        </>
    )
}