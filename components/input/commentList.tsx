import React from 'react'
import { CommentItemType } from './comments'
interface CommentListProps {
  comments: CommentItemType[];
}
const CommentList = (props : CommentListProps) => {
    const {comments : items} = props ;
    if(items.length === 0){
        return <p className="text-gray-500 text-center py-4">No comments yet.</p>
    }
return (
 <ul className="flex flex-col gap-4">
{items.map((item: CommentItemType) => (
    <li key={item._id} className="text-left py-2 border-b-2 border-gray-300">
            <p className="m-0">{item.text}</p>
                                <div className="text-right italic">
                    By <address className="inline">{item.name}</address>
                </div>
    </li>
))}
 </ul>
)
}

export default CommentList
