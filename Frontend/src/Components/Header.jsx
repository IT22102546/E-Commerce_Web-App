import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { HiShoppingBag, HiUser } from 'react-icons/hi';

export default function Header() {
  return (
    <Navbar className="border-b-2 relative z-50 bg-slate-500">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
   
        <div className="flex items-center">
          <NavLink to="/" className="self-center whitespace-nowrap text-3xl font-semibold font-tangerine ml-0 md:ml-16">
            Logo
          </NavLink>
        </div>
        
    
        <div className="flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-black" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/categories" 
            className={({ isActive }) => 
              isActive ? "text-black" : "text-white"
            }
          >
            Categories
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? "text-black" : "text-white"
            }
          >
            Contact Us
          </NavLink>
          <NavLink 
            to="/blogs" 
            className={({ isActive }) => 
              isActive ?"text-black" : "text-white"
            }
          >
            Blogs
          </NavLink>
        </div>
        
        <div className="flex space-x-8 items-center">
          
          <NavLink 
            to="/sign-in" 
            className={({ isActive }) => 
              isActive ? "text-black" : "text-white"
            }
          >
            <HiUser className="mr-0" style={{ fontSize: '24px' }} />
       
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              isActive ? "text-black": "text-white"
            }
          >
             <HiShoppingBag className="mr-1" style={{ fontSize: '24px' }} />
     
          </NavLink>
        </div>
      </div>
    </Navbar>
  );
}
