import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate=useNavigate()
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      const userData = JSON.parse(data);
      setUserInfo(userData);
    }
  }, []); 

  const handleLogOut=async()=>{
    localStorage.removeItem('user-info')
    navigate('/login')
  }

  return (
    <div>
      {userInfo ? (
        <>
          <h1>Welcome {userInfo.name}</h1>
          <h3>Email: {userInfo.email}</h3>
          <img src={userInfo?.image} alt={userInfo?.name} />

          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Dashboard;
