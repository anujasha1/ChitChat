import axios from "axios";
import { useState } from "react";
import SendOtp from "./SendOtp";


function LogIn({ user, setUser, signIn, setSignIn }) {

    const [otpVerify, setOtpVerify] = useState(false)

    const submitLogIn = (e) => {
        e.preventDefault()
        {
            signIn == false ? axios({ method: 'post', url: "http://localhost:3002/api/login/sign_up", params: { user } }).then((res) => alert(res.data))
                :
                axios({ method: 'post', url: "http://localhost:3002/api/login/log_in", params: { user } }).then((res) => {setOtpVerify(true);}).catch((err) => {console.log(err) })

        }
    }

    function updateUser(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div>
            { !otpVerify ? 
            <form onSubmit={(e) => submitLogIn(e)}>
                {!signIn &&
                    <><label htmlFor={"first_name"}> FIrst Name</label>
                        <input type="text" name={"first_name"} onChange={updateUser}></input> <br /><br />

                        <label htmlFor={"last_name"}> Last Name</label>
                        <input type="text" name={"last_name"} onChange={updateUser}></input> <br /><br /></>}

                {signIn && <><label htmlFor={"user_name"}>User name</label>
                    <input type="text" name={"user_name"} onChange={updateUser}></input> <br /><br /> </>}

                <label htmlFor={"password"}>Password</label>
                <input type="password" name={"password"} onChange={updateUser} ></input> <br /><br />

                {!signIn && <> <label htmlFor={"repeat_password"}>Repeat Password</label>
                    <input type="password" name={"repeat_password"} ></input> <br /><br />

                    <label htmlFor={"email"}>Email</label>
                    <input type="email" name={"email"} ></input> <br /><br /></>}
                <button type="submit">Submit</button>


                <p>already have an account? <span onClick={() => { setSignIn(!signIn); setUser({}) }}> {signIn ? "Create an account" : "Sign In"} </span></p>
            </form>

: <SendOtp user={user}/>}
        </div>
    )
}

export default LogIn