"use client";

import { useRef, useState, FormEvent } from "react";

interface CommentData {
  email: string;
  name: string;
  text: string;
}
interface NewCommentProps {
  onAddComment: (data: CommentData) => void;
}

const NewComment = (props: NewCommentProps) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value || "";
    const enteredName = nameInputRef.current?.value || "";
    const enteredComment = commentInputRef.current?.value || "";

    if (
      !enteredEmail.trim() ||
      !enteredEmail.includes("@") ||
      !enteredName.trim() ||
      !enteredComment.trim()
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    // Clear inputs and reset validation state after successful submit
    if (emailInputRef.current) emailInputRef.current.value = "";
    if (nameInputRef.current) nameInputRef.current.value = "";
    if (commentInputRef.current) commentInputRef.current.value = "";
    setIsInvalid(false);
  }

return (
  <form
    onSubmit={sendCommentHandler}
    className="
      my-8 w-full max-w-160 mx-auto 
      rounded-md bg-[#03be9f] shadow-md p-4
    "
  >
    <div className="flex gap-4 flex-wrap">
      <div className="mb-2 flex-1 min-w-40">
        <label
          htmlFor="email"
          className="block font-bold mb-2 text-white text-left"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          ref={emailInputRef}
          className="w-full p-1 rounded border border-gray-300 bg-[#dcfff9]"
        />
      </div>

      <div className="mb-2 flex-1 min-w-40">
        <label
          htmlFor="name"
          className="block font-bold mb-2 text-white text-left"
        >
          Your name
        </label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          className="w-full p-1 rounded border border-gray-300 bg-[#dcfff9]"
        />
      </div>
    </div>

    <div className="mb-2">
      <label
        htmlFor="comment"
        className="block font-bold mb-2 text-white text-left"
      >
        Your comment
      </label>
<textarea
  id="comment"
  ref={commentInputRef}
  className="
    w-full p-2 rounded-md border border-gray-300 
    bg-[#dcfff9] text-black
    focus:outline-none focus:ring-2 focus:ring-[#03be9f]
  "
></textarea>

    </div>

    {isInvalid && (
      <p className="text-white font-semibold">
        Please enter a valid email address, name, and comment!
      </p>
    )}

    {/* Center the button */}
    <div className="w-full flex justify-center mt-4">
<button
  className="
    bg-white text-[#03be9f] font-semibold 
    px-6 py-2 rounded-md
    border border-white cursor-pointer
    transition-all duration-200
    hover:bg-[#dcfff9] hover:border-[#03be9f] hover:text-[#03be9f]
    shadow-sm
  "
>
  Submit
</button>
    </div>
  </form>
);

};

export default NewComment;
