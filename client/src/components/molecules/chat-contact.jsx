export default function ChatContact(props) {
    return (
        <article className="chat-contact">
            <img src={props.picture} alt="photo-profile" />
            <div>
                <p>{props.name}</p>
                <p>{props.messege}</p>
            </div>
        </article>
    )
}