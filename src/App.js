import React from "react";
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Details from "./details";
function App(){
    return (
        <BrowserRouter>
           
            <Routes>
               <Route path ='/' element={<Home/>}></Route>
               <Route path ='/details/:id' element={<Details/>}></Route>
        
            </Routes>
        </BrowserRouter>
      
     
    );
}
export default App;