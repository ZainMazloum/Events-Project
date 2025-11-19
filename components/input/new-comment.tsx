/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, FormEvent, RefObject } from 'react';
import classes from './new-comment.module.css';

// 1. Define the structure for the data the parent component expects
interface CommentData {
  email: string;
  name: string;
  text: string;
}

// 2. Define the props expected by this component
interface NewCommentProps {
  onAddComment: (commentData: CommentData) => void;
}

// 3. Type the references for the input elements
type InputRef = RefObject<HTMLInputElement>;
type TextAreaRef = RefObject<HTMLTextAreaElement>;

// Use the defined props type for the component
function NewComment(props: NewCommentProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  // Type the useRefs to match the HTML elements they point to
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Type the event as FormEvent from React
  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();

    // Safely check if the ref's current value exists and get the value
    const enteredEmail = emailInputRef.current?.value || '';
    const enteredName = nameInputRef.current?.value || '';
    const enteredComment = commentInputRef.current?.value || '';

    // Data validation logic
    if (
      !enteredEmail.trim() ||
      !enteredEmail.includes('@') ||
      !enteredName.trim() ||
      !enteredComment.trim()
    ) {
      setIsInvalid(true);
      return;
    }

    // Reset invalid state if validation passes
    setIsInvalid(false);

    // Call the prop function with the correctly typed data object
    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          {/* Assigning the ref to the HTML input element */}
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          {/* Assigning the ref to the HTML input element */}
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        {/* Assigning the ref to the HTML textarea element */}
        <textarea id='comment' ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address, name, and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewComment;