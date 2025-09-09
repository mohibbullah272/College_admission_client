

import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';




const Main: React.FC = () => {


  return (
    <div className="flex flex-col   min-h-screen">
      <Navbar>
      </Navbar>
      
      <main className="flex-grow ">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Main;