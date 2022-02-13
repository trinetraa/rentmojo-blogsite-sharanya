import {useState, useEffect} from "react";
import {useNavigate, useLocation, createSearchParams} from "react-router-dom";
import {getQuery} from "../utilities/util";

export default function UserPosts(props){
    const [authorData, setAuthorData] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [isUserPostsLoaded, setIsUserPostsLoaded] = useState(false);
    const {search} = useLocation();
    const [searchPost, setSearchPost] = useState("");
    const [queryParams, setQueryParams] = useState(getQuery(search));
    const navigate = useNavigate();
    const [disableNext, setDisableNext] = useState(queryParams.start==5);
    const [disablePrev, setDisablePrev] = useState(queryParams.start==0);

    useEffect(()=>{
        console.log(queryParams);
        console.log(search);
        getUserPosts(queryParams.userId, queryParams.start);
        // getAuthorData(queryParams.userId);
        navigationDisabler();
    }, [queryParams])

    useEffect(()=>{
        filterPosts();
    }, [searchPost])

    // const getAuthorData = async (userId)=>{
    //     try{
    //         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    //         const results = await response.json();
    //         setAuthorData(results);
    //         console.log(authorData);
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }

    const getUserPosts = async (userId, start)=>{
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_start=${start}&_limit=5`);
            const results = await response.json();
            setUserPosts(results);
            setDisplayPosts(results);
            console.log(results);
            setIsUserPostsLoaded(true);
            console.log(userPosts);
        }
        catch(e){
            console.log(e);
        }
    }

    const navigationDisabler = ()=>{
        if(queryParams.start=='0'){
            setDisablePrev(true);
            setDisableNext(false);
        }
        if(queryParams.start=='5') {
            setDisablePrev(false);
            setDisableNext(true);
        }
    }

    const handleFilterSearch = (val)=>{
        console.log("in filter handler");
        setSearchPost(val);
    }

    const paginationHandler = (direction)=>{
        let start = parseInt(queryParams.start);
        console.log(queryParams);
        if(direction=="next"){
            start += 5;
        }
        else start -= 5;
        navigate({
            pathname: '../user-posts',
            search: `?${createSearchParams({
                userId: queryParams.userId,
                start: start
            })}`
        });
        setQueryParams(Object.assign({}, queryParams, {start: start}));
        // navigationDisabler();
    }

    const filterPosts = ()=>{
        let temp = [];
        if(searchPost==""){
            setDisplayPosts(userPosts);
        }
        if(searchPost!=""){
            temp = displayPosts.filter((el)=>{
                return (el.title.toLowerCase().indexOf(searchPost.toLowerCase())!=-1)
            })
            setDisplayPosts(temp);
        }
    }

    const navigateToHome = ()=>{
        navigate('../');
    }

    const goToPost = (id)=>{
            navigate({
                pathname: '../post-details',
                search: `?${createSearchParams({
                    userId: queryParams.userId,
                    start: queryParams.start,
                    postId: id
                })}`
            });
    }
    
    return(
        <div className="user-posts-container">
            <h1 className="user-posts-header">User's BlogPost</h1>
            <div className="filters">
                <div className="post-filter">
                    <input placeholder="Search Post" value={searchPost} name="post-search" id="post-search" onChange={(e)=>{handleFilterSearch(e.target.value)}}/>
                </div>
            </div>
            <div className="posts-list">
            {
                displayPosts.map((el)=>{
                    return(
                    <div className="user-post" key={el.id}>
                      <h3 className="post-title">{el.title}</h3>
                      <button onClick={()=>{goToPost(el.id)}}>Read Post</button>  
                    </div>
                    )
                })
            }
            </div>
            <div className="nav-buttons">
                <button className="prev" disabled={disablePrev} onClick={()=>{paginationHandler("prev")}}>Previous</button>
                <button className="next" disabled={disableNext}  onClick={()=>{paginationHandler("next")}} >Next</button>
                <button onClick={navigateToHome}>Home</button>
            </div>
        </div>
    )
}

