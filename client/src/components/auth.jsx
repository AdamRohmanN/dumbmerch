import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query'
import { API } from '../config/api'
import { UserContext } from '../context/userContext';
import logo from "../assets/logo.svg";
import "./auth.css"

export default function Heading() {
    return(
        <section className='heading'>
            <img src={logo} alt="logo" />
            <h1>Easy, Fast and Reliable</h1>
            <p>
                Go shopping for merchandise, just go to dumb merch shopping.<br />
                the biggest merchandise in <strong>Indonesia</strong>
            </p>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </section>
    )
}

export function Register() {
    document.title = "DumbMerch | Register"
    const navigate = useNavigate()

    const [message, setMessage] = useState(<h2>Register</h2>)

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })
    const { name, email, password } = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => { //masukan data dengan use mutation
        try {
            e.preventDefault()

            const body = JSON.stringify(form)
            const config = { //konfigurasi tipe konten
                headers: {'Content-type': 'application/json'}
            }
            await API.post('/register', body, config) //perintah ke API

            setMessage(null)
            navigate('/login')
        } catch (error) {
            setMessage(
                <div>
                    <h2>Register Error!</h2>
                    <h4>{error.response.data.message}</h4>
                </div>
            )
            console.log(error)
        }
    })

    return (
        <main className='auth'>
            <Heading />
            <section className='res-log'>
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    {message}
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    )
}

export function Login() {
    document.title = "DumbMerch | Login"
    const navigate = useNavigate()
    
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(<h2>Login</h2>)

    const [form, setForm] = useState({
        email: '', password: ''
    })
    const { email, password } = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => { //masukan data dengan use mutation
        try {
            e.preventDefault()

            const body = JSON.stringify(form)
            const config = { //konfigurasi tipe konten
                headers: {'Content-type': 'application/json'}
            }
            const response = await API.post('/login', body, config) //perintah ke API

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data.user
            })

            setMessage(null)
        } catch (error) {
            setMessage(
                <div>
                    <h2>Login Error!</h2>
                    <h4>{error.response.data.message}</h4>
                </div>
            )
            console.log(error);
        }
    })

    const checkAuth = () => {
        if (state.isLogin === true) {
            (state.user.status === "admin") ? navigate('/admin-product') : navigate('/')
        }
    }
    checkAuth()

    return (
        <main className='auth'>
            <Heading />
            <section className='res-log'>
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    {message}
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                    <p>belum memiliki akun?<br />silahkan buat di <Link to='/register'>register</Link></p>
                </form>
            </section>
        </main>
    )
}