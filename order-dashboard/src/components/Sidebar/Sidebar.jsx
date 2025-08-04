import React from "react";
import "./Sidebar.css"; // Assuming you have a CSS file for styling

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h1>
        Order
        <br />
        Dashboard
      </h1>
      <button className='sidebar-button'>Dashboard</button>
      <button className='sidebar-button'>Orders</button>
      <button className='sidebar-button'>Product</button>
      <button className='sidebar-button'>Customers</button>
    </div>
  );
};

export default Sidebar;
