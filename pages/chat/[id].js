import React from "react";
import Head from "next/head";
import SideBar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import getReceipientEmail from "../../utils/getReceipientEmail";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getDoc,
	query,
	setDoc,
    orderBy,
	where,
} from "firebase/firestore";

const Chat = ({chat, messages}) => {
    console.log(chat, messages)
    const [user, loading] = useAuthState(auth);
    const recipientEmail = getReceipientEmail(chat.users, user.email);    
	return (
		<div className="flex ">
			<Head>
				<title>Chat with {recipientEmail} </title>
			</Head>

			<div className='hidden md:block'>
				<SideBar />
			</div>

            <div className="overflow-scroll flex-1 h-screen scroll-hidden">
                <ChatScreen chat={chat} messages={messages} />
            </div>
		</div>
	);
};

export default Chat;

export const getServerSideProps =  async (context) => {
    const ref = doc(db, "chats", context.query.id)    

    // PREP messages resoult on Server
    const messagesRes = await getDocs(query(collection(ref, "messages"), orderBy("timetsamp", "asc")))

    console.log(messagesRes.docs)

    const messages = messagesRes.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
    })).map((messages)=> ({
        ...messages,
        timestamp:messages.timestamp.toData().getTime()
    }))
    
    // PREP chats result on Server

    const chatRes = await getDoc(ref)

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }    


    return {
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }

}
