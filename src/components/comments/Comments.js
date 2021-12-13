import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from "./CommentsList"

const Comments = () => {
  const {quoteID} = useParams();

  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(quoteID)
  }, [quoteID, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // call this function to fetch comments again after submitting a new comment.
  // use useCallback to prevent recreating the function when the Parent component re-renders. (prevents an infinite loop)
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID])

  let comments;
  if(status === 'pending'){
    comments = <div className='centered'><LoadingSpinner/></div>
  }
  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = <CommentsList comments={loadedComments}/>
  }
  if(status === 'completed' && (loadedComments && loadedComments.length === 0)){
    comments = <p className='centered'>No comments yet.</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} quoteID={quoteID}/>}
      {comments}
    </section>
  );
};

export default Comments;
