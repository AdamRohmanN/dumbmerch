import { useState, useEffect } from "react";
import Navbar from "./molecules/navbar";
import ProductCard from "./molecules/card-product";
import "./product.css"
import { API } from "../config/api";

export default function Product() {
    document.title = "DumbMerch | Product"

    // const { data: products } = useQuery('productsCache', async () => { //gak perlu useState & useEffect
    //     const response = await API.get('/products')
    //     return response.data.data.products
    // })

    const [products, setProducts] = useState([])

    async function getProducts() {
        const response = await API.get("/products")
        setProducts(response.data.data.products)
    }

    useEffect(()=> {
        getProducts()
    }, [])
    return (
        <>
        <Navbar />
        <main className="page">
            <h3>Product</h3>
            <section className="product-layout">
                {products?.map((item) => (
                    <ProductCard key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    qty={item.qty}
                    />
                ))}
            </section>
        </main>
        </>
    )
}