import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/chat/room1">Chat Room 1</Link>
      <Link to="/chat/room2">Chat Room 2</Link>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
