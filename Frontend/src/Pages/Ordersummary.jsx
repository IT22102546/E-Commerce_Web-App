import { useState } from "react";
import { Alert } from "flowbite-react";
import { useSelector, useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import md5 from 'crypto-js/md5';

export default function Ordersummary() {
      const [publishError, setPublishError] = useState(null);
      const cart = useSelector((state) => state.cart);
      console.log(cart);
      //const dispatch = useDispatch();
      const navigate = useNavigate();
      const deliveryfee = 300;
      const {currentUser} = useSelector((state) => state.user);

    const [payHereFormData, setpayHereFormData] = useState({
        userId:currentUser._id,
        productsId: cart.cartItems?.map((cartItem) => ({
          title: cartItem.title,
          quantity: cartItem.cartTotalQuantity,
          mainImage: cartItem.mainImage,
        })),
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city:"",
        zip:"",
        subtotal:cart.cartTotalAmount,
        deliveryfee:300,
        totalcost:cart.cartTotalAmount + 300,
      });

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {

           const res = await fetch(`/api/order/create`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(payHereFormData),
          });
      
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to create order');
          }
      
          // If response is okay, clear any previous error state
          setPublishError(null);
          
          // Redirect user to success page
          
          navigate('/order-pay-success');
        } catch (error) {
          
          setPublishError(error.message || 'Something went wrong');
        }
      };
      
    
      
    
    

  return (
    <>
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="/cart"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                <span className="font-semibold text-gray-900">Cart</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                  <span className="font-semibold text-gray-900">Order Summary</span>
                  </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                <span className="font-semibold text-gray-500">Payment</span>
                </li>
                </ul>
            </div>
        </div>
    </div>

    {/* <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">*/}
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items.before placing the order.</p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {cart.cartItems?.map((cartItem) => (
        <>
        <div key={cartItem.title} className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cartItem.mainImage} alt="" />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold text-rose-600">{cartItem.title}</span>

            <span className="float-right text-gray-400">{cartItem.description}</span>
            <p className="text-lg font-bold">Rs.{cartItem.price}.00</p>
          </div>
        </div>
        </>
      ))}
        
      </div>
    </div>

    {(!currentUser) ? (
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto pt-8">
          <p className="font-semibold text-center  ">Please Sign in to complete order.</p>
          <div className="text-center mt-5 mb-10">
              <Link to="/sign-in">
                <span className="p-2 bg-gray-200 rounded px-5 hover:bg-green-400 hover:text-white">
                  Log in
                </span>
              </Link>
          </div>
        </div>
      
        ):( 
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Shipping Details</p>
            <p className="text-gray-400">Complete your order by providing your details.</p>


            <form>
              <div className="">
              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">First Name</label>
              <div className="relative">
                  <input type="text" id="" name="text" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, first_name: e.target.value })} placeholder="Your First Name" required/>
              </div>

              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Last Name</label>
              <div className="relative">
                  <input type="text" id="" name="text" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, last_name: e.target.value })} placeholder="Your Last Name" required />
              </div>

              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                  <input type="email" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, email: e.target.value })} placeholder="Your Email" required/>
              </div>

              <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
              <div className="relative">
                  <input type="number" id="" name="" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, phone: e.target.value })} placeholder="Your Phone Number" required/>
              </div>

              <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
              <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                      <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, address: e.target.value })} placeholder="Street Address" required/>
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/b570febe9d96977515795be73e7bb057.svg" alt="" />
                      </div>
                  </div>
                  <input type="text" name="city" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, city: e.target.value })} placeholder="City" required/>
                
                  <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setpayHereFormData({ ...payHereFormData, zip: e.target.value })} placeholder="ZIP"  required/>
              </div><br />
              {/* <input type="hidden" name="country" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value="Sri Lanka" placeholder="sjdkasdas"/> */}

          
              <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">Rs.{cart.cartTotalAmount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Delivery fee</p>
                  <p className="font-semibold text-gray-900">Rs.{deliveryfee}</p>
                  </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">Rs.{cart.cartTotalAmount + deliveryfee}</p>
              </div>
              </div><br />
              

              <button type="submit"  onClick={handleSubmit} className="rounded-full w-full  py-3 px-6 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Place Order</button>
              {publishError && (
                <Alert className='mt-5' color='failure'>
                  {publishError}
                </Alert>
              )}
            </form>
            

            <br /><br /><br /><br />
        </div>
         )}; 
      </div>

  </>
  )
}

