import { ReactDOM } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints"
interface NotificationProps{
    title : string,
    message : string ,
    status : string
}
function Notification(props : NotificationProps){
    const {title , message , stauts} = props;
    return ReactDOM.createPortal(
<div>
    <h2>{title}</h2>
    <p>{message}</p>
</div>
document.getElementById('notifications')
    )
}
export default Notification;