"use client"
import { useEffect, useState, useCallback, useContext } from 'react';

// Assuming these child components are also correctly typed
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';
// 1. Define the type for a single comment item
export interface CommentItemType {
  _id?: string; // MongoDB typically uses _id, but it might just be 'id'
  id: string;
  email: string;
  name: string;
  text: string;
}

// 2. Define the type for the props this component expects
interface CommentsProps {
  eventId: string;
}

function Comments(props: CommentsProps) {
const notificationCtx = useContext(NotificationContext)
  const { eventId } = props;

  // 3. Type the state variables
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Added for better UX

  // Helper function to fetch comments (extracted for clarity)
  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/comments/' + eventId);

      if (!response.ok) {
        throw new Error('Failed to fetch comments.');
      }

      // Assuming the API response body is { comments: CommentItem[] }
      const data: { comments: CommentItemType[] } = await response.json();
      setComments(data.comments);
      
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Optional: Add a state to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [eventId]); // eventId is a dependency for useCallback

  // 4. useEffect to fetch comments when showComments changes
  useEffect(() => {
    if (showComments) {
        fetchComments();
    }
  }, [showComments, fetchComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  // 5. Type the function argument and use async/await for clearer error handling
  async function addCommentHandler(commentData: Omit<CommentItemType, 'id' | '_id'>) {
    notificationCtx.showNotification({
      title:"Adding...",
      message : "Adding a comment",
      status : "pending",
    })
    try {
      const response = await fetch('/api/comments/' + eventId, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        notificationCtx.showNotification({
          title:"Error!",
          message : "An Error has occured while adding a comment",
          status : "error"
        })
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit comment.');
      }

      const data = await response.json();
      console.log('Comment submitted:', data);

      // Optional: Re-fetch comments to show the new one immediately
      // This is better than manually updating the state
      notificationCtx.showNotification({
        title:"Done!",
        message : "Your comment has been added.",
        status:"success"
      })
      await fetchComments(); 
      
    } catch (error) {
        console.error("Error submitting comment:", error);
        // Optional: Show an error notification here
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <>
          {isLoading && <p>Loading comments...</p>}
          {!isLoading && <CommentList items={comments} />}
        </>
      )}
    </section>
  );
}

export default Comments;