import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { signInStart,signInSuccess,singInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuthenticate from "../Components/OAuthenticate";



export default function SignIn() {
    const [formData , setFormData] = useState({});
    const{loading , error} = useSelector((state)=>state.user);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]:e.target.value.trim()});
      };
      const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password){
            dispatch(singInFailure("Please Fill all fields"));
        }
        try{
           dispatch(signInStart());
          const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                photo: formData.profilePicture,
              }),
          });
      
          const data = await res.json();
          console.log(data);
       
         if(data.success == false){
            dispatch(singInFailure(data.message));
          return;
         }
         dispatch(signInSuccess(data));
          navigate('/')
        }catch(error){
            dispatch(singInFailure(error.message));
        }
       
        
      }

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



  return (
    <div className="min-h-screen "  style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/loft-style-house-with-armchair-accessories-room-3d-rendering_41470-3877.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: '',
        backgroundRepeat: 'no-repeat',
    }}>
        
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20 ">
            {/* left */}
            <div className="flex-1">
                <Link to ="/" className="text-5xl font-bold dark:text-white font-tangerine">
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500  text-white rounded-lg  size-10/12" >Furniture</span>Shop
                </Link>
                <p className="text-sm mt-5 font-cinzel font-gray font-semibold">Join with us to get quality Furnitues which suits for you</p>
            </div>
            {/* right */}
            <div className="flex-1 mt-20">
                <p className="text-center text-2xl font-cinzel font-semibold ">Sign In</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
                   
                    <div>
                        <Label value="Your email"/>
                        <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
                    </div>
                     <div>
                            <Label value="Your password"/>
                            <div className="relative">
                                <TextInput type={showPassword ? "text" : "password"} placeholder="Password" id="password" onChange={handleChange}/>
                                    <button type="button" className="absolute top-2 right-3 focus:outline-none" onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c5.185 0 9.448 4.014 9.95 9.048a.944.944 0 0 1 0 .904C21.448 16.486 17.185 20.5 12 20.5S2.552 16.486 2.05 13.452a.944.944 0 0 1 0-.904C2.552 8.514 6.815 4.5 12 4.5zM12 6a9 9 0 0 0-8.72 6.752.944.944 0 0 1 0 .496A9 9 0 0 0 12 18a9 9 0 0 0 8.72-4.752.944.944 0 0 1 0-.496A9 9 0 0 0 12 6z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z" />
                                        </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15a7 7 0 01-7-7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </button>

                            </div>
                        </div>
                    <Button className="bg-slate-500" disabled={loading} gradientDuoTone='purpleToBlue' type="submit">{loading ? (
                        <>
                            <Spinner size='sm'/>
                           <span className="pl-3">Loading</span>
                        </>
                       
                    ):'Sign In'}</Button>
                    <OAuthenticate/>
                </form>
                <div className="flex gap-2 text-sm mt-5 ">
                    <span>Forget Password?</span>
                    <Link to='/forgetPassword' className="text-blue-500">Click Here</Link>
                </div>
                

                <div className="flex gap-2 text-sm mt-5 ">
                    <span>Dont have an Account?</span>
                    <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
                </div>
                <div className="text-red-600">
                {
                   
                    error && (
                        
                        <Alert className="mt-5" color='failure'>
                            {error} 
                        </Alert>
                    )
                }
                </div>
            </div>
           
        </div>
    </div>
  )

}



