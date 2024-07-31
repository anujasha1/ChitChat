import { useEffect, useState } from "react"
import axios from "axios"
import { findAllByTestId } from "@testing-library/react"

function DisplayMessages({allMessages, currentUserId, viewUser, setallMessages}) {
    const [message, setMessage] = useState({sender_id: currentUserId,
        receiver_id: viewUser,
        body: ''})

    useEffect(()=>{
        console.log("0000-----",allMessages)
        setMessage({sender_id: currentUserId,
            receiver_id: viewUser,
            body: ''})
    },[viewUser])


    const updateMessageContent = (e) => {
        setMessage({...message, ['body']: e.target.value})
    } 

    const sendText = (e) => {
        e.preventDefault()
        axios({method: 'post', url: 'http://localhost:3002/api/users/send_message', params:{message}}).then((res) => {console.log("--data---", res.data); setMessage({...message, 'body': ''}); setallMessages([...allMessages, res.data.message]) })
    }


    return(
        <>
        {allMessages.map((message, i) => {return(<p key={i}>{message.body}</p>)})}
        
        <form onSubmit={sendText}>
        <input placeholder="Enter your message here" type="textarea" name="body" value={message.body} onChange={(e) => {updateMessageContent(e)}} />
        <input type="submit" value="send"/>
        </form>
        </>
    )
}

export default DisplayMessages