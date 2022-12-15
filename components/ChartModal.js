import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as EmailValidator from "email-validator";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

export default function FormDialog({ open, setOpen, value, setValue }) {
	const [user, loading] = useAuthState(auth);
	const userChartRef = query(
		collection(db, "chats"),
		where("users", "array-contains", user.email),
	);
	const [chatsSnapshot] = useCollection(userChartRef);

	const handleClose = () => {
		setOpen(false);
	};

	const fun = async (reciepientEmail) => {
		const querySnapshot = await getDocs(userChartRef);        	
		return !!querySnapshot.docs.find((chat) => {
			chat.data().users.find((user) => user == reciepientEmail)?.length > 0;
		});
	};

    let vals = fun(value).then((doc) => console.log(doc))    
	const chatsAlreadyExist =  (reciepientEmail) =>
		!!chatsSnapshot?.docs.find((chat) => {
			chat.data().users.find((user) => user === reciepientEmail)?.length > 0;
		});
        // console.log(chatsAlreadyExist(value))

	const submit = () => {		
		console.log(fun(value));
        console.log(vals)
		setOpen(false);
		if (!value) return null;
        
		if (EmailValidator.validate(value) && value !== user.email) {			
			console.log(EmailValidator.validate(value));
			addDoc(collection(db, "chats"), {
				users: [user.email, value],
			});
		} else {
            alert("Email not found, Please try inputing the correct email")
        }
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Chat</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please, Kindly enter the email of the person you want to chat with
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Email Address'
						type='email'
						onChange={(newVal) => setValue(newVal.target.value)}
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={submit}>Chat</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
