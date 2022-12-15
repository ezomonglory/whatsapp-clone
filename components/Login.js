import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
	const provider = new GoogleAuthProvider();
	

	const signIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	return (
		<div className="grid place-items-center items-center h-[100vh]">
			<Head>
				<title>Login</title>
			</Head>

			<div className='w-[90%] md:w-[500px] md:p-[100px] p-[2rem]  items-center justify-center flex flex-col mx-auto space-y-4 shadow-md shadow-gray-500'>
				<Logo src="/image/wtsp.png"  />

				<Button variant='outline-none' onClick={signIn} className="border border-gray-400 border-solid">
					Sign in with Google
				</Button>
			</div>
		</div>
	);
}

export default Login;


const Logo = styled.img`
    width:200px;
`