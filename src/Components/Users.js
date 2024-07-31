import { useEffect, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import DisplayMessages from "./DisplayMessages"

function Users({ currentUserId }) {
    const [allUsers, setAllUsers] = useState([])
    const [viewUser, setViewUser] = useState('')
    const [cookies, setCookies, removeCookies] = useCookies(['auth-token'])
    const [showMessages, setShowMessages] = useState(false)
    const [allMessages, setallMessages] = useState([])

    useEffect(() => {
        axios({ method: 'get', url: "http://localhost:3002/api/users/get_all_users" }).then((res) => { setAllUsers(res.data.users) })
    }, [])

    const ViewMessages = (user) => {
        setViewUser( user.id)
        console.log("---view user---", viewUser)
        axios({ method: 'get', url: 'http://localhost:3002/api/users/get_all_messages', params: { user_id: user.id, current_user_id: currentUserId } }).then((res) => { if(res.data.allMessages.length > 0) { setShowMessages(true); setallMessages(res.data.allMessages); }})
    }

    return (<div>
        <button onClick={() => { removeCookies(['authToken']); window.location.reload() }}>Log Out</button>
        <table>
            <tbody>
                <tr>
                    <th>Users</th></tr>
                {allUsers && allUsers.filter((i) => i.id != currentUserId).map((user, i) => {
                    return (
                        <tr key={i}><td onClick={() => ViewMessages(user)}>{user.id} {user.first_name} {user.last_name}</td></tr>
                    
                    )
                })}
            </tbody>
        </table>

        {showMessages && <DisplayMessages allMessages={allMessages} setallMessages={setallMessages} currentUserId={currentUserId} viewUser={viewUser}/>}

    </div>)
}

export default Users