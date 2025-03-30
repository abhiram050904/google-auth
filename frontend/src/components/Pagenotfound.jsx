import React from 'react'
import { useNavigate } from 'react-router-dom'
function Pagenotfound() {
  const navigate=useNavigate()
  return (
    <div>
      <h2>404 page not found</h2>
      <button onClick={()=>navigate('/login')} >Login</button>
    </div>
  )
}

export default Pagenotfound
