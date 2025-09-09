import Main from "@/Layout/Main";
import Admission from "@/pages/Admission";
import Colleges from "@/pages/Colleges";
import Home from "@/pages/Home";
import MyCollege from "@/pages/MyCollege";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
    {
        path:'/',
        Component:Main,
        children:([
          {  
            path:'/',
            Component:Home
        
        },
        {
            path:'/colleges',
            Component:Colleges
        },
        {
            path:'/my-college',
           Component:MyCollege
        },
        {
            path:'/admission',
            Component:Admission
        }
        ])
    },
 
])