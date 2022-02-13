export default function Comments(props){
    return(
    <div className="users-comment">
        <h4 className="commenter-name">{props.name}</h4>
        <p className="commenter-email">{props.email}</p>
        <p className="comment-content">{props.body}</p>
    </div>
    )
}