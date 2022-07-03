import { useEffect } from "react";
import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/userContext";
import { Register, Login } from "./auth";
import Detail from "./detail";
import Product from "./product";
import Profile from "./profile";
import { AdminComplain, UserComplain } from "./complain";
import { TableCategory, TableProduct } from "./tables"
import { AddCategory, EditCategory } from "./form-category"
import AddProduct from "./products-add";
import EditProduct from "./products-edit";
import "../index.css"

const now = new Date(2022, 6, 24, 18);
const hour = now.getHours();

if (hour >= 6 && hour < 18) {
  document.documentElement.style.setProperty('--navbg', '#00000032')
  document.documentElement.style.setProperty('--lightest', '#0b0b0b')
  document.documentElement.style.setProperty('--darkest', '#f0f0f0')
}

if (localStorage.token) { setAuthToken(localStorage.token) } //memasukan token

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  useEffect( () => { //if unauthrorized => kick to /login else check token
    if (state.isLogin === false) {
      navigate('/login')
    } else {
      checkAuth()
    }
  }, [])
  
  const checkAuth = async () => { //checking user token here
    try {
      const response = await API.get('/check-auth')

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = response.data.data.user
      payload.token = localStorage.token
      
      dispatch({
        type: 'USER_SUCCESS',
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Product />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/complain" element={<UserComplain />} />
      <Route path="/admin-complain" element={<AdminComplain />} />
      <Route path="/admin-category" element={<TableCategory />} />
      <Route path="/admin-category/add" element={<AddCategory />} />
      <Route path="/admin-category/edit/:id" element={<EditCategory />} />
      <Route path="/admin-product" element={<TableProduct />} />
      <Route path="/admin-product/add" element={<AddProduct />} />
      <Route path="/admin-product/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}
