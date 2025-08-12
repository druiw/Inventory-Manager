import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h1>
        Order
        <br />
        Dashboard
      </h1>

      <Link to='/' className='sidebar-button'>
        Add Stock
      </Link>
      <Link to='/orders' className='sidebar-button'>
        Orders
      </Link>
      <Link to='/product' className='sidebar-button'>
        Product
      </Link>
      <Link to='/customers' className='sidebar-button'>
        Customers
      </Link>
    </div>
  );
};

export default Sidebar;
