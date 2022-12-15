import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import styled from "styled-components"
import moment from 'moment/moment';

function Message({user, message}) {   

    const [userLoggedIn] = useAuthState(auth)

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  return (
    <div>    
        <p className='w-fit p-[15px] m-[10px] rounded-[8px] min-w-[60px] relative text-right pb-[26px] '></p>            
        <TypeOfMessage> {message.message}
        <Timestamp>
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."} 
        </Timestamp>
         </TypeOfMessage>
    </div>
  )
}

export default Message

const MessageElement = styled.p`
width:fit-content;
padding:15px;
margin:10px;
border-radius:8px;
min-width:60px;
position:relative;
text-align: right;
padding-bottom:26px;
`

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;
`

const Receiver = styled(MessageElement)`
background-color: whitesmoke;
text-align:left;
`

const Timestamp = styled.span`
color:gray;
padding:10px;
font-size:9px;
position:absolute;
bottom:0;
text-align: right;
right:0;
`