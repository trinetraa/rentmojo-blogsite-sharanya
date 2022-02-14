export default function Comments(props){
    return(
    <div className="users-comment">
        <b><p className="commenter-name">{props.name}</p></b>
        <small><p className="commenter-email">{props.email}</p></small>
        <p className="comment-content">{props.body}</p>
    </div>
    )
}