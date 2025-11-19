"use client"
import {createContext ,  useEffect , useState , ReactNode  } from "react"
export interface CommentsData{
    title : string ,
    message : string,
    status : "success" | "error" | "pending"
}
export interface CommentsContextType{
    comments : CommentsData | null,
    showComments : (commentsData : CommentsData) => void,
    hideComments : () => void;
}
export const initialContext : CommentsContextType = {
comments : null ,
showComments : () => {},
hideComments : () => {}
}
export const CommentsContext = createContext<CommentsContextType>(initialContext)
interface CommentsContextProviderProps{
 children : ReactNode
}
export function CommentsContextProvider({children} : CommentsContextProviderProps){
    const [activeComment , setActiveComment] = useState<CommentsData | null>(null) 
    useEffect(() => {
        if(activeComment && (activeComment.status === "error" || activeComment.status === "success")){
            const timer = setTimeout(() => {
                setActiveComment(null)
            } , 3000)
            return () => clearTimeout(timer)
        }
    } ,[activeComment])
    const showComments = (commentData : CommentsData) => {
        setActiveComment(commentData)
    }
const hideComments = () => {
    setActiveComment(null)
}
const contextValue : CommentsContextType = {
comments : activeComment,
showComments : showComments,
hideComments : hideComments
}
return (
    <CommentsContext.Provider value = {contextValue}>
        {children}
    </CommentsContext.Provider>
)
}
export default CommentsContextProvider