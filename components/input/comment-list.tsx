
import classes from './comment-list.module.css';

// 1. Define the type for a single comment item
// Based on usage, it needs a unique key (_id), text, and name.
import { CommentItemType } from './comments';

// 2. Define the props expected by this component
interface CommentListProps {
  items: CommentItemType[]; // Expects an array of CommentItem objects
}

// Use the defined props type for the component
function CommentList(props: CommentListProps) {
  const { items } = props;

  // Handle case where items might be empty
  if (items.length === 0) {
    return <p className={classes.noComments}>No comments yet.</p>;
  }
  
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        // Accessing typed properties provides type safety
        <li key={item._id}>  
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;