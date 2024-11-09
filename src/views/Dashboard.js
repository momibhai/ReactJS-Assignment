import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />

      {/* Content area with right-aligned heading */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Align content to the right
          alignItems: 'center',       // Center vertically
          height: '100vh',            // Full height of the viewport
          paddingRight: '20px',       // Add some padding if needed for spacing
        }}
      >
        <h1>Welcome React JS (Frontend) and Laravel Backend Dashboard</h1>
      </div>
    </>
  )
}

export default Dashboard