"use client";
import { useState, useEffect , useContext } from "react";
import CommentList from "./commentList";
import NewComment from "./new-comment";
import { NotificationContext } from "@/store/notification-context";

export interface CommentItemType {
  _id: string;
  email: string;
  name: string;
  text: string;
}

interface CommentsProps {
  eventId: string;
}

const Comments = ({ eventId }: CommentsProps) => {
  const notificationCtx = useContext(NotificationContext)
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentItemType[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (!showComments) return;

    const fetchComments = async () => {
      setIsFetchingComments(true);
      try {
        const res = await fetch(`/api/comments/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");

        const data = await res.json();
        const normalized = Array.isArray(data) ? data : data?.comments;

        setComments(Array.isArray(normalized) ? normalized : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsFetchingComments(false);
      }
    };
    fetchComments();
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored in our database.",
      status: "pending",
    })
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Something went wrong!",
          status: "error",
        }) 
        throw new Error("Failed to add comment");
      } 
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data.comment]);
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your comment was saved!",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: "Something went wrong!",
        status: "error",
      })
      console.error("Error adding comment:", error);
    }
  }

  return (
    <section
      className="
        my-12 mx-auto 
        w-[90%] 
        max-w-160 
        text-center
      "
    >
      <button
        onClick={toggleCommentsHandler}
        className="
          font-inherit 
          rounded-md 
          px-4 
          py-2 
          bg-transparent 
          text-[#03be9f] 
          border 
          border-[#03be9f] 
          cursor-pointer
          hover:bg-[#dcfff9]
          active:bg-[#dcfff9]
        "
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
    </section>
  );
};

export default Comments;
