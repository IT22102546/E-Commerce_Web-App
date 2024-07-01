import { useState } from "react";
import { Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Ordersummary() {
  const [publishError, setPublishError] = useState(null);
  const cart = useSelector((state) => state.cart);
  const deliveryfee = 300;
  const { currentUser } = useSelector((state) => state.user);
  const [payHereFormData, setPayHereFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "Sri Lanka",
    items: cart.cartItems?.map((cartItem) => ({
      title: cartItem.title,
      quantity: cartItem.cartTotalQuantity
    })),
  });

  const handlePayHerePayment = async (e) => {
    e.preventDefault();
    const totalAmount = cart.cartTotalAmount + deliveryfee;
    const orderId = '12345';
    const amount = totalAmount.toFixed(2);
    const currency = 'LKR';

    try {
      const response = await fetch('http://localhost:3000/generate-hash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order_id: orderId, amount, currency })
      });
      const data = await response.json();

      setPayHereFormData((prevData) => ({
        ...prevData,
        merchant_id: data.merchantId,
        return_url: 'http://localhost:5173/',
        cancel_url: 'http://localhost:5173/Ordersummary',
        notify_url: 'http://localhost:3000/api/notify/status',
        order_id: orderId,
        currency: currency,
        amount: amount,
        hash: data.hash
      }));

      // Create a form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payhere.lk/pay/checkout';

      Object.keys(payHereFormData).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payHereFormData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error generating hash:', error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4 font-cinzel">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700" href="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-200 text-xs font-semibold text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </a>
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
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8 font-cinzel">
          <p className="text-xl font-semibold">Order Summary</p>
          <p className="text-gray-500 font-semibold">Check your items before placing the order.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.cartItems?.map((cartItem) => (
              <div key={cartItem.title} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cartItem.mainImage} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold text-primary text-xl">{cartItem.title}</span>
                  <span className="float-right text-gray-600">Qty x{cartItem.quantity}</span>
                  <p className="text-lg font-bold">Rs. {cartItem.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {(!currentUser) ? (
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto pt-8">
            <p className="font-semibold text-center font-cinzel">Please Sign in to complete order.</p>
            <div className="text-center mt-5 mb-10">
              <Link to="/sign-in">
                <span className="p-2 bg-slate-200 rounded px-5 hover:bg-primary hover:text-white">
                  Log in
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 bg-slate-50 px-4 pt-8 lg:mt-0 font-cinzel pb-5">
            <p className="text-xl font-semibold">Shipping Details</p>
            <p className="text-gray-700">Complete your order by providing your details.</p>
            <form onSubmit={handlePayHerePayment}>
              <div className="">
                <label htmlFor="first_name" className="mt-4 mb-2 block text-sm font-semibold">First Name</label>
                <div className="relative">
                  <input type="text" id="first_name" name="first_name" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, first_name: e.target.value })} placeholder="Your First Name" required />
                </div>
                <label htmlFor="last_name" className="mt-4 mb-2 block text-sm font-semibold">Last Name</label>
                <div className="relative">
                  <input type="text" id="last_name" name="last_name" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, last_name: e.target.value })} placeholder="Your Last Name" required />
                </div>
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-semibold">Email</label>
                <div className="relative">
                  <input type="email" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, email: e.target.value })} placeholder="Your Email" required />
                </div>
                <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-semibold">Phone</label>
                <div className="relative">
                  <input type="number" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, phone: e.target.value })} placeholder="Your Phone Number" required />
                </div>
                <label htmlFor="address" className="mt-4 mb-2 block text-sm font-semibold">Address</label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input type="text" id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, address: e.target.value })} placeholder="Street Address" required />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/b570febe9d96977515795be73e7bb057.svg" alt="" />
                    </div>
                  </div>
                  <input type="text" name="city" className="w-full rounded-md border border-gray-200 px-4 py-3 text-md shadow-sm outline-none focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, city: e.target.value })} placeholder="City" required />
                  <input type="text" name="zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-md shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-primary focus:ring-primary" onChange={(e) => setPayHereFormData({ ...payHereFormData, zip: e.target.value })} placeholder="ZIP" required />
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Subtotal</p>
                    <p className="font-semibold text-gray-900">Rs.{cart.cartTotalAmount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Delivery fee</p>
                    <p className="font-semibold text-gray-900">Rs.{deliveryfee}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">Rs.{cart.cartTotalAmount + deliveryfee}</p>
                </div>
              </div>
              <br />
              <button type="submit" className="rounded-full w-full py-3 px-6 text-center justify-center items-center bg-primary font-semibold text-lg text-black flex transition-all duration-500 hover:bg-slate-500 bg-slate-300">Place Order</button>
              {publishError && (
                <Alert className='mt-5' color='failure'>
                  {publishError}
                </Alert>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}


