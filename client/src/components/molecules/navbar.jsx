import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import logo from "../../assets/logo.svg";
import "./navbar.css"

export default function Navbar() {
    const [state, dispatch] = useContext(UserContext)

    function logingOut() {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <header>
            <nav>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <ul>
                    {
                    (state.isLogin === true && state.user.status === "admin") ?
                    <Admin /> : <Customer />
                    }
                    <li>
                        {
                        (state.isLogin === true) ?
                        <Link to="/login" onClick={logingOut}>Logout</Link> :
                        <Link to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

function Admin() {
    return(
        <>
        <li>
            <Link to="/admin-complain" className={document.title === "Admin | Complain" ? "navbar-active" : ""}>
                Complain
            </Link>
        </li>
        <li>
            <Link to="/admin-category" className={document.title === "Admin | Category" ? "navbar-active" : ""}>
                Category
            </Link>
        </li>
        <li>
            <Link to="/admin-product" className={document.title === "Admin | Product" ? "navbar-active" : ""}>
                Product
            </Link>
        </li>
        </>
    )
}

function Customer() {
    return(
        <>
        <li>
            <Link to="/complain" className={document.title === "DumbMerch | Complain" ? "navbar-active" : ""}>
                Complain
            </Link>
        </li>
        <li>
            <Link to="/profile" className={document.title === "DumbMerch | Profile" ? "navbar-active" : ""}>
                Profile
            </Link>
        </li>
        </>
    )
}