import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Orders from "./components/Order/Orders";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <>
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;
