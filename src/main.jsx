import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter,Routes, Route } from "react-router";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx";
import App_v1 from "./App_v1.jsx"
import './reducers.js';
import{ Provider} from 'react-redux'
import {store} from './reducers.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/expense-tracker" element={<App_v1/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
