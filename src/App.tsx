import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import SignUp from "./components/NewUser";
import Router, { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Sidebar from "./components/sidebar";
import Layout from "./pages/layout";
import BooksList from "./components/bookList";
import NewBook  from "./components/newBook";
import Register from "./components/NewUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          { <Route path="/home" element={<Layout />}>
            <Route index element={<BooksList/>} />
            <Route path="newbook" element={<NewBook />} />
            <Route path="newuser" element={<Register />} />
          </Route> }
      
        {/* <Route path="/" element={<Layout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
