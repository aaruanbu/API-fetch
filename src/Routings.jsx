import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Detai } from "./Details";

export const Routss=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/detls" element={<Detai />}></Route>
        </Routes>
        </BrowserRouter>
    )
}