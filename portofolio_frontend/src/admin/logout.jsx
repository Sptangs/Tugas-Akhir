import React, { useState } from 'react';

const Logout = async () => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        mode:"cors",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn'); 
        window.location.href = '/login'; 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
export default Logout;