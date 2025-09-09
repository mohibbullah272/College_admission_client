import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
    <div className="grow-1"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Main;