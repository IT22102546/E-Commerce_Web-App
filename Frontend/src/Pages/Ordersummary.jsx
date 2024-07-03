import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PayButton from '../Components/PayButton';

export default function OrderSummary() {
  const [publishError, setPublishError] = useState(null);
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const deliveryfee = 300;

  const [payHereFormData, setPayHereFormData] = useState({
    userId: currentUser?._id,
    productsId: cart.cartItems?.map((cartItem) => ({
      title: cartItem.title,
      quantity: cartItem.cartTotalQuantity,
    })),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    subtotal: cart.cartTotalAmount,
    deliveryfee: 300,
    totalcost: cart.cartTotalAmount + 300,
  });

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link to="/cart">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 text-xs font-semibold text-white">
                    1
                  </span>
                </Link>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link to="/checkout">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 text-xs font-semibold text-white">
                    2
                  </span>
                </Link>
                <span className="font-semibold text-gray-900">Delivery</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 text-xs font-semibold text-white">
                  3
                </span>
                <span className="font-semibold text-gray-900">Payment</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 text-xs font-semibold text-white">
                  4
                </span>
                <span className="font-semibold text-gray-900">Summary</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pb-5">
        <div className="px-4 pt-8 lg:pt-16">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.cartItems?.map((cartItem) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={cartItem._id}
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={cartItem.mainImage}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {cartItem.title} ({cartItem.cartTotalQuantity})
                  </span>
                  <p className="text-lg font-bold">
                    LKR {cartItem.cartTotalQuantity * cartItem.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <h2 className="text-xl font-medium">Shipping Methods</h2>
          <form className="mt-8 space-y-3 rounded-lg bg-white px-2 py-4 sm:px-6">
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-4">
              <input
                id="default-radio-1"
                type="radio"
                value="Free Shipping"
                name="delivery-method"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                checked={true}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 block text-sm font-medium text-gray-900"
              >
                Free Shipping
              </label>
              <span className="ml-auto text-sm font-semibold">LKR 0</span>
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-4">
              <input
                id="default-radio-2"
                type="radio"
                value="One Day Delivery"
                name="delivery-method"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 block text-sm font-medium text-gray-900"
              >
                One Day Delivery
              </label>
              <span className="ml-auto text-sm font-semibold">LKR 500</span>
            </div>
          </form>
          <PayButton
            cartItems={cart.cartItems}
            cartTotalAmount={cart.cartTotalAmount}
            deliveryfee={deliveryfee}
          />
        </div>
      </div>
    </>
  );
}
