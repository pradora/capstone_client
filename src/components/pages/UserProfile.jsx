import React, { useEffect, useState } from 'react';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = 'your_token_here';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: headers
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;