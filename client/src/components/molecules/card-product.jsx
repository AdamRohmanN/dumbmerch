import { useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format"

export default function ProductCard(props) {
    const navigate = useNavigate()

    function detailed(id) {
        navigate(`/detail/${id}`)
    }
    return (
        <article onClick={() => detailed(props.id)} className="product-card">
            <img src={props.image} alt={props.name} />
            <div>
                <h4>{props.name}</h4>
                <p>{convertRupiah.convert(props.price)}</p>
                <p>Stock: {props.qty}</p>
            </div>
        </article>
    )
}