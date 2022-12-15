import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from '@mui/icons-material/Search';
import ChartModal from "./ChartModal";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import Chat from "./Chat"



function Sidebar() {
    const [open, setOpen] = useState(false);  
    const [value, setValue] = React.useState("") 
    const [user, loading] = useAuthState(auth);
	const userChartRef = query(
		collection(db, "chats"),
		where("users", "array-contains", user.email),
	);
	const [chatsSnapshot] = useCollection(userChartRef);
    console.log(chatsSnapshot)


    const createChart = () => {
        setOpen(true)          
    }
    
    
	return (
        <Container>
			<Header>
				<UserAvatar src={user.photoURL} onClick={()=> signOut(auth)} />

				<IconsContainer>
					<IconButton>
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconsContainer>
			</Header>            

            {open && <ChartModal setOpen={setOpen} open={open} value={value} setValue={setValue} />}
            
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search Chats here" />                
            </Search>

            <SideBarButton onClick={createChart}>
                Start a new chat
            </SideBarButton>

            {/* List of Chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
            
		</Container>
	);
}



export default Sidebar;

const Container = styled.div`
flex:0.45;
border-right: 1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width: 350px;
overflow-y: scroll;

::-webkit-scrollbar{
    display: none;
}
`;

const Header = styled.div`
display: flex;
position:sticky;
top:0;
background-color: white;
z-index:1;
justify-content:space-between;
align-items:center;
padding:15px;
height:80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor:pointer;
:hover {
    opacity:0.8;
}
`;

const IconsContainer = styled.div``;

const Search = styled.div`
display:flex;
align-items:center;
padding:20px;
border-radius: 2px;
`
const SearchInput = styled.input`
outline-width: 0;
flex: 1;
border:none
`

const SideBarButton = styled(Button)`
width:100%;
&&&{
    border-top: 1px solid whitesmoke;
border-bottom:1px solid whitesmoke;
}
`