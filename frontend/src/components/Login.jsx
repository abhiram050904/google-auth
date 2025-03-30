import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const responseGoogle=async(authResult)=>{
        try{
            if(authResult.code){
              const result=await axios.get(`${BASE_URL}/google?code=${authResult.code}`,{withCredentials:true});

              const {email,name,image}=result.data.user
              const token=result.data.token

              const obj={email,name,image,token}
              localStorage.setItem('user-info',JSON.stringify(obj))
              navigate('/dashboard')
            }
        }
        catch(err){
            console.log('error while requesting goggle codezzz in a:',err)
        }
    }
    const goggleLogin=useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-code'
    })

  return (
    <div>
      <button onClick={goggleLogin}>Login with Google</button>
    </div>
  )
}

export default Login
