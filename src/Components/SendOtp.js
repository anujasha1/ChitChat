import axios from "axios"
import { useState } from "react";
import { useCookies } from "react-cookie";
import Users from "./Users";

function SendOtp({ user }) {

    const [successfullyLogged, setSuccesslyLogged] = useState(false)
    const [otp, setOtp] = useState('')
    const [cookies, setCookie, removeCookies] = useCookies(['auth-token'])

    const VerifyOtp = (event) => {
        axios({ method: 'post', url: "http://localhost:3002/api/login/verify_otp", params: { otp: otp, user: user } }).then((res) => { setCookie("authToken", res.data.authToken); setSuccesslyLogged(true) }).catch((err) => { console.log(err) })

    }

    return (
        <div>
            {!successfullyLogged ?
                <>OTP has been sent to registered email address {user.email} <br /> <br />
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input type="integer" name="otp" placeholder="Enter 6 digit OTP here" value={otp} onChange={(e) => {setOtp(e.target.value) }} /> <br /> <br />
                        <input type="submit" onClick={() => { VerifyOtp() }} />
                    </form></>
                : <Users currentUserId={user.id}/>}
        </div>
    )
}

export default SendOtp