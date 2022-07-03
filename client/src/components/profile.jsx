import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProfileCard from "./molecules/card-profile";
import Navbar from "./molecules/navbar";
import "./profile.css";
import { API } from "../config/api"

export default function Profile() {
    document.title = "DumbMerch | Profile"

    const [user, setUser] = useState([])
    
    async function getUser() {
        const response = await API.get(`/user/`)
        setUser(response.data.user)
    }

    useEffect(()=> {
        getUser()
    }, [])
    return (
        <>
        <Navbar />
        <main className="profile">
            <section className="user">
                <h3>My Profile</h3>
                <article>
                    <img src={user?.image} alt={user?.name} />
                    <div>
                        <h4>Name</h4>
                        <p>{user?.name}</p>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                        <h4>Phone</h4>
                        <p>{user?.number}</p>
                        <h4>Gender</h4>
                        <p>{user?.gender}</p>
                        <h4>Address</h4>
                        <p>{user?.address}</p>
                    </div>
                </article>
            </section>
            <section className="card">
                <h3>My Transaction</h3>
                <ProfileCard
                image="https://picsum.photos/200/300"
                name="Mouse"
                date="Saturday, 14 Juli 2021"
                price="500000"
                qty="2"
                />
            </section>
        </main>
        </>
    )
}