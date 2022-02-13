import {useNavigate, createSearchParams} from "react-router-dom";
export default function UsersTable(props){
    const navigate = useNavigate();
    const goToUserPosts = ()=>{
        navigate({
            pathname: 'user-posts',
            search: `?${createSearchParams({
                userId: props.id,
                start: 0
            })}`
        });

    }
    return(
        <tr className="table-rows">
            <td className="users-name">{props.name}</td>
            <td className="users-company">{props.company}</td>
            <td className="users-blog"><button className="users-blog-link" onClick={goToUserPosts}>Blog Post</button></td>
        </tr>
    )
}