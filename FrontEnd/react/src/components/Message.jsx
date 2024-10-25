import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../../public/extractTime";
import useConversation from "./useConversation"

const Message = ({ message }) => {
	const { authUser, loggedInUser } = useAuthContext()
	const { selectedConversation } = useConversation()
	const fromMe = loggedInUser?._id && message.senderId === loggedInUser._id
	const formattedTime = extractTime(message.createdAt)
	const chatClassName = fromMe ? "chat-end" : "chat-start"
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
	const bubbleBgColor = fromMe ? "bg-green-900" : ""

	console.log("logged in user",loggedInUser._id)
	
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
        <img
            src={profilePic || 'https://static.vecteezy.com/system/resources/previews/021/079/672/non_2x/user-account-icon-for-your-design-only-free-png.png'}
            alt="User profile"
          />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	)
}
export default Message
