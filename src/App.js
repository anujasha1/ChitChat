
import './App.css';
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import LogIn from './Components/LogIn';
import Users from './Components/Users';
import axios from 'axios';

function App() {
  const [signIn, setSignIn] = useState(true)
  const [user, setUser] = useState(signIn == false ? {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  } : { user_name: '', password: '' })

  const [cookies, setCookies, removeCookies] = useCookies(['auth-token'])
const [currentUserId, setCurrentUser] = useState('')


  useEffect(() => {
    axios({method: 'post', url: 'http://localhost:3002/api/users/get_current_user', params: {auth_token: cookies['authToken']}}).then((res) => {setCurrentUser(res.data.currentUser[0])})
  
  })

  return (
    <div>
      {cookies['authToken'] ? <Users currentUserId={currentUserId}/> : <LogIn user={user} setUser={setUser} signIn={signIn} setSignIn={setSignIn} />}
    </div>
  );
}

export default App;
