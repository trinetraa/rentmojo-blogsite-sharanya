import { useState, useEffect } from "react";
import {useNavigate, useLocation, createSearchParams} from "react-router-dom";
import {getQuery} from '../utilities/util';
import Comments from "./Comments";
import Loader from "./Loader";

export default function PostDetails(){
    const [postDetails, setPostDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const [isCommentsLoaded, setIsCommenetsLoaded] = useState(false);
    const {search} = useLocation();
    const [queryParams, setQueryParams] = useState(getQuery(search));
    const navigate = useNavigate();
    const [isPostDeleted, setIsPostDeleted] = useState(true)

    useEffect(()=>{
        getPostDetails(queryParams.postId);
    }, [])

    const getPostDetails = async (postId) =>{
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const results = await response.json();
            setPostDetails(results);
            setIsPostLoaded(true);
            console.log(results);
        }
        catch(e){
            console.log(e);
        }
    }

    const getComments = async () =>{
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${queryParams.postId}`);
            const results = await response.json();
            setComments(results);
            setIsCommenetsLoaded(true);
            console.log(results);
        }
        catch(e){
            console.log(e);
        }
    }

    const deletePost = async ()=>{
        try {
            setIsPostDeleted(false);
            if(confirm("Do you want to delete this post?")){
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${queryParams.postId}`, {
                method: "DELETE"
            })
            setIsPostDeleted(true);
            alert("The post has been deleted successfully.");
            navigate({
                pathname: '../user-posts',
                search: `?${createSearchParams({
                    userId: queryParams.userId,
                    start: queryParams.start
                })}`
            });
            }
        }
        catch(e){
            console.log(e);
            }
    }



    if(!isPostLoaded){
        return(
            <>
            <Loader/>
            </>
        )
    }
    else{
        return(
            <div className="post-details-container">
                <div className="post-details">
                    <h3 className="post-heading">{postDetails.title}</h3>
                    <p className="post-content">{postDetails.body}</p>
                </div>
                <button className="load-comments" onClick={getComments}>Show Comments</button>
                <button className="hide-comments" onClick={()=>{
                    setIsCommenetsLoaded(false);
                }}>Hide Comments</button>
                <button className="delete-post" onClick={deletePost}>Delete Post</button>
                {
                    (!isPostDeleted) && (
                    <div className="delete-loader">
                        <Loader/>
                    </div>  
                    )
                }
                
                <div className="comments-container">
                    <h4 className="comments-header">Comments
                    </h4>
                    {
                        isCommentsLoaded && (
                        <div className="comments">
                            {
                                comments.map((el)=>{
                                    return(
                                        <Comments key={el.id} name={el.name} email={el.email} body={el.body}/>
                                    )  
                                })
                            }
                        </div>
                        ) 
                    }
                </div>
            </div>
        )
    }
}