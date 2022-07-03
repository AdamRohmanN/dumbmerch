import logo from "../../assets/logo.svg"

export default function ProfileCard(props) {
    const total = props.price * props.qty

    return (
        <article>
            <img src={props.image} alt={props.name} />
            <div>
                <h5>{props.name}</h5>
                <p>{props.date}</p>
                <p>Price: Rp.{props.price}</p>
                <p>Sub Total: {total}</p>
            </div>
            <img src={logo} alt="logo" />
        </article>
    )
}