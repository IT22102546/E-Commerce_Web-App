import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiShoppingBag, HiUser } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
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
            to="/product-page" 
            className={({ isActive }) => 
              isActive ? "text-black" : "text-white"
            }
          >
            Products
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

        {currentUser && (
            <Link to="/cart">
              <div className="flex relative">
              <HiShoppingBag className="mr-1" style={{ fontSize: '24px' }} />
                 
              </div>
            </Link>
          )}
          
        {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={
                        <Avatar alt="user" img={currentUser.profilePicture} rounded className="h-10 w-10" />
                    }>
                        <DropdownHeader>
                            <span className="block text-sm">{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider/>
                        <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
                    </Dropdown>
                ) : (
                  <Link to="/sign-in">
                 
                    <HiUser className="text-white"/>
             
                  </Link>
                )}
          
        </div>
      </div>
    </Navbar>
  );
}
