import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, } from "react-router-dom";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const sendLink = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        
        if (email === "") {
            setError("Email is required!");
            return;
        } 
        if (!email.includes("@")) {
            setError("Please include @ in your email!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/user/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (data.status === 201) {
                setEmail("");
                setMessage("Password reset link sent successfully!");
            } else {
                setError("Invalid User");
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen" style={{
            backgroundImage: `url('https://img.freepik.com/premium-photo/loft-style-house-with-armchair-accessories-room-3d-rendering_41470-3877.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: '',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
                <div className="flex-1 mt-48">
                    <Link to ="/" className="text-5xl font-bold dark:text-white font-tangerine">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500 text-white rounded-lg size-10/12">Furniture</span>Shop
                    </Link>
                    <p className="text-sm mt-5 font-cinzel font-gray font-semibold"></p>
                </div>
                <div className="flex-1 mt-24">
                    <p className="text-center text-2xl font-cinzel font-semibold">Reset Password</p>
                    <form onSubmit={sendLink} className="flex flex-col gap-4 mt-5">
                        <div>
                            <Label value="Enter Your Email" />
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} value={email} />
                        </div>
                        <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Send Rest Link"}
                        </Button>
                    </form>
                    {message && <p className="text-green-600 mt-3">{message}</p>}
                    {error && <p className="text-red-600 mt-3">{error}</p>}
                    <div className="flex gap-2 text-sm mt-5 ">
                        <span>Remembered your password?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
