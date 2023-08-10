import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WorkSpace from "./WorkSpace/WorkSpace";
import Login from "./Login/Login";
import Channel from "./Channel/Channel";
import Tree from "./Channel/History/Tree";
import BookMarkPage from './BookMark/BookMarkPage';

// <Route path='/' element={<Login />}/>
//       <Route path='/workspace' element={<WorkSpace />}/>
//       <Route path='/chat' element={<Chat />}/>

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/workspace" element={<WorkSpace />} />
      <Route path="/channel/:channelId" exact element={<Channel />}></Route>
      <Route path="/channel/:channelId/tree" exact element={<Tree />} />
      <Route path="/bookmark" element={<BookMarkPage />} />
    </Routes>
  );
}
export default App;