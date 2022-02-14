import "../styles/PostDetails.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { getQuery } from "../utilities/util";
import Comments from "./Comments";
import Loader from "./Loader";

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [isCommentsLoaded, setIsCommenetsLoaded] = useState(false);
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState(getQuery(search));
  const navigate = useNavigate();
  const [isPostDeleted, setIsPostDeleted] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [displayComments, setDisplayComments] = useState([]);

  useEffect(() => {
    getPostDetails(queryParams.postId);
  }, []);

  useEffect(() => {
      if(searchVal!=''){
    const temp = comments.filter((el) => {
      return el.name.indexOf(searchVal) > -1 || el.body.indexOf(searchVal) > -1;
    });
    setDisplayComments(temp);
} else {
    setDisplayComments(comments);
}
  }, [searchVal]);

  const getPostDetails = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const results = await response.json();
      setPostDetails(results);
      setIsPostLoaded(true);
    } catch (e) {
      setIsPostLoaded(true);
      alert('An error has occured. Please try again');
    }
  };

  const getComments = async () => {
    try {
        setSearchVal('');
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${queryParams.postId}`
      );
      const results = await response.json();
      setComments(results);
      setIsCommenetsLoaded(true);
      setDisplayComments(results);
    } catch (e) {
      setIsCommenetsLoaded(true);
      alert('An error has occured. Please try again');
    }
  };

  const searchChangeHandler = (val) => {
    setSearchVal(val);
  };

  const deletePost = async () => {
    try {
      if (confirm("Do you want to delete this post?")) {
        setIsPostDeleted(false);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${queryParams.postId}`,
          {
            method: "DELETE",
          }
        );
        setIsPostDeleted(true);
        alert("The post has been deleted successfully.");
        navigate({
          pathname: "../user-posts",
          search: `?${createSearchParams({
            userId: queryParams.userId,
            start: queryParams.start,
          })}`,
        });
      }
    } catch (e) {
      setIsPostDeleted(true);
      alert('An error has occured. Please try again');
    }
  };

  if (!isPostLoaded) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
    return (
      <div className="post-details-container">
        <div className="post-container">
          <div className="post-details">
            <h3 className="post-heading">{postDetails.title}</h3>
            <p className="post-content">{postDetails.body}</p>
          </div>
        </div>

        <button className="details-button" onClick={getComments}>
          Show Comments
        </button>
        <button
          className="details-button"
          onClick={() => {
            setIsCommenetsLoaded(false);
            setSearchVal('');
          }}
        >
          Hide Comments
        </button>
        <button className="details-button" onClick={deletePost}>
          Delete <br />
          Post
        </button>
        {!isPostDeleted && (
          <div className="delete-loader">
            <Loader />
          </div>
        )}

        <div className="comments-container">
          <h4 className="comments-header">Comments</h4>
          {isCommentsLoaded && (
            <div className="comments">
              <div className="filters">
                <div className="filter">
                  <input
                    placeholder="Search Comments"
                    className="input-field"
                    autocomplete="off"
                    name="comment-search"
                    value={searchVal}
                    onChange={(e) => {
                      searchChangeHandler(e.target.value);
                    }}
                  />
                </div>
              </div>
              {displayComments.length > 0 &&
                displayComments.map((el) => {
                  return (
                    <Comments
                      key={el.id}
                      name={el.name}
                      email={el.email}
                      body={el.body}
                    />
                  );
                })}
            </div>
          )}
          {
              !displayComments.length>0 &&
              <div className="no-results">No results found.</div>
          }
        </div>
      </div>
    );
  }
}
