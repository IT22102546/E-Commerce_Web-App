import { useState } from "react";
import { Alert, Button, Label, TextInput ,Spinner} from "flowbite-react";
import { Link , useNavigate } from "react-router-dom";
import OAuthenticate from "../Components/OAuthenticate";


export default function SignUp() {
    const [formData , setFormData] = useState({});
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value.trim()});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.username || !formData.email || !formData.password || !formData.mobile || !formData.adress) {
            return setError('Please Fill all Fields');
        }

        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);
            if(data.success === false) {
                setError(data.message);
                return;
            }
            navigate('/sign-in');
        } catch(error) {
            setLoading(false);
            setError(error.message);
        }
    };

   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen " style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/006/835/433/non_2x/design-space-frame-mockup-design-free-photo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: '',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
                {/* left */}
                <div className="flex-1">
                <Link to ="/" className="text-5xl font-bold dark:text-white font-tangerine">
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500  text-white rounded-lg  size-10/12" >Furniture</span>Shop
                </Link>
                <p className="text-sm mt-5 font-cinzel text-black font-extrabold">Join with us to get quality Furnitues which suits for you</p>
            </div>
                {/* right */}
                <div className="flex-1 mt-20">
                    <p className="text-center text-2xl font-cinzel font-semibold ">Sign Up</p>
                    <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Your username"/>
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your email"/>
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your Address"/>
                            <TextInput type="text" placeholder="Address" id="adress" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your mobile number"/>
                            <TextInput type="text" placeholder="Mobile Number" id="mobile" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your password"/>
                            <div className="relative">
                                <TextInput type={showPassword ? "text" : "password"} placeholder="Password" id="password" onChange={handleChange}/>
                                    <button type="button" className="absolute top-2 right-3 focus:outline-none" onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.818 8.818a4 4 0 0 1 0 6.364M5.636 8.818a4 4 0 0 1 0 6.364M11.998 5.996v.01" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.1V12a3.999 3.999 0 0 1 3.999-4 3.999 3.999 0 0 1 3.999 4v6.1c0 2.21-1.791 4-3.999 4a3.999 3.999 0 0 1-3.999-4z" />
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
                        <Button disabled={loading}  type="submit" className="bg-slate-500">
                            {loading ? (
                                <>
                                    <Spinner size='sm'/>
                                    <span className="pl-3">Loading</span>
                                </>
                            ) : 'Sign Up'}
                        </Button>
                        <OAuthenticate/>
                    </form>
                    <div className="flex gap-2 text-sm mt-5 ">
                        <span>Have an Account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
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
