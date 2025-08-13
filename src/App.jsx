import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Orders from "./components/Order/Orders";
import Product from "./components/Product/Product";
import Customers from "./components/Customers/Customers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className='layout'>
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/product' element={<Product />} />
            <Route path='/customers' element={<Customers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
