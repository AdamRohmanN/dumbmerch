import Navbar from "./molecules/navbar";
import ChatContact from "./molecules/chat-contact";
import "./complain.css"
import { useEffect } from "react";
import { io } from "socket.io-client"

export function UserComplain() {
    document.title = "DumbMerch | Complain"

    let socket

    useEffect(() => {
        socket = io('http://localhost:5000')

        return () => {
            socket.disconnect()
        }
    },[])
    
    return (
        <>
        <Navbar />
        <main className="full-page">
            <section>
                <ChatContact
                picture="https://picsum.photos/200/300?grayscale"
                name="Admin"
                messege="Yes, is there anything I can help"
                />
            </section>
            <section className="chat-messege">
                <input type="text" placeholder="Send Message" />
            </section>
        </main>
        </>
    )
}

export function AdminComplain() {
    document.title = "DumbMerch | Complain"
    return (
        <>
        <Navbar />
        <main className="full-page">
            <section>
                <ChatContact
                picture="https://picsum.photos/200/300?grayscale"
                name="User"
                messege="Hey, I need help"
                />
            </section>
            <section className="chat-messege">
                <input type="text" placeholder="Send Message" />
            </section>
        </main>
        </>
    )
}

export default { UserComplain, AdminComplain }