import React from "react";
import { Avatar } from "@mui/material";
import getReceipientEmail from "../utils/getReceipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";

const Chat = ({ id, users }) => {
	const [user, loading] = useAuthState(auth);
	const recipientEmail = getReceipientEmail(users, user.email);    
	console.log(recipientEmail);
	const chatsEmailRef = query(
		collection(db, "users"),
		where("email", "==", recipientEmail),
	);
	const [recipientSnapshot] = useCollection(chatsEmailRef);
	const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipientSnapshot)
	const router = useRouter();
	const enterChat = () => {
		router.push(`/chat/${id}`);
	};

	return (
		<div
			className='flex items-center p-[15px] cursor-pointer break-words hover:bg-[#e9eaeb]'
			onClick={enterChat}
		>
			{recipient ? (
				<Avatar src={recipient.photoUrl} className='m-[5px] mr-[15px]' />
			) : (
				<Avatar className='m-[5px] mr-[15px]'>{recipientEmail[0]} </Avatar>
			)}
			<p>{recipientEmail}</p>
		</div>
	);
};

export default Chat;
