import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { auth, db } from "../firebase";
import getReceipientEmail from "../utils/getReceipientEmail";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react"
import {
	addDoc,
	collection,
	doc,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import Message from "./Message";
import MicIcon from "@mui/icons-material/Mic";

const ChatScreen = ({ chat, messages }) => {	
	const [user, loading] = useAuthState(auth);
	const recipientEmail = getReceipientEmail(chat.users, user.email);
	const router = useRouter();
	const [input, setInput] = useState("");
    const endOfMessageRef = useRef()
	const ref = doc(db, "chats", router.query.id);

	const [messagesSnapshot] = useCollection(
		query(collection(ref, "messages"), orderBy("timestamp", "asc")),
	);

	const [recipientSnapshot] = useCollection(
		query(collection(db, "users"), where("email", "==", recipientEmail)),
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => {
				return (
					<Message
						key={message.id}
						user={message.data().user}
						message={{
							...message.data(),
							timestamp: message.data().timestamp?.toDate().getTime(),
						}}
					/>
				);
			});
		} else {
			console.log("jjijiipop");
			return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
		}
	};

    const ScrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behaviour:"smooth",
            block:"start",
        })
    }

	const sendMessage = (e) => {
		e.preventDefault();

		setDoc(
			doc(collection(db, "users"), user.uid),
			{
				lastSeen: serverTimestamp(),
			},
			{ merge: true },
		);

		addDoc(collection(ref, "messages"), {
			timestamp: serverTimestamp(),
			message: input,
			user: user.email,
			photoUrl: user.photoURL,
		});

		setInput("");
        ScrollToBottom();
	};

	const recipient = recipientSnapshot?.docs?.[0]?.data();

    console.log(recipient)

	return (
		<div className='h-full'>
			<div className='fixed bg-white z-[100] top-0 flex p-[11px] h-[80px] items-center border-b-gray-200 border shadow-gray-300 shadow-sm w-full '>
                <ArrowBackIcon className="mr-[1rem]" onClick={()=> {
                    router.push("/")
                }} />
				{recipient ? (
					<Avatar src={recipient?.photoUrl} />
				) : (
					<Avatar>{recipientEmail[0]}</Avatar>
				)}
				<div className='m-[15px] flex-1'>
					<h3 className='mb-[3px] text-[1rem] font-semibold '>
						{recipientEmail}
					</h3>
					{recipientSnapshot ? (
                        <p>Last active: {" "}
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo  datetime={recipient?.lastSeen?.toDate()} />
                        )  : "Unavailable"}
                        </p>
                    ) : (<p>Loading Last active</p>)}
				</div>
			
			</div>

			{/* Message Container */}
			<div className='p-[15px] min-h-[90vh] bg-[#e5ded8] scroll-hidden'>
				{/* Show Messages */}
				{showMessages()}

				<div ref={endOfMessageRef} className="mb-[150px]">

                </div>
			</div>

			{/* Input container //form */}
			<form className='flex items-center p-[10px] sticky bottom-0  z-[100] bg-white'>
				<InsertEmoticonIcon />
				{/* input */}
				<input
					type='text'
					className='flex-1 outline-none border-none rounded-sm p-[7px] ml-[15px] mr-[15px] bg-gray-200 sticky bottom-0'
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
				<button hidden disabled={!input} type='submit' onClick={sendMessage}>
					Send Message
				</button>
				<SendIcon onClick={sendMessage} />
			</form>
		</div>
	);
};

export default ChatScreen;
