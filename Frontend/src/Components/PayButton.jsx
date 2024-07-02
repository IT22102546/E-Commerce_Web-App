import { useSelector } from "react-redux";

const PayButton = ({ cartItems, cartTotalAmount, deliveryfee }) => {
    const {currentUser} = useSelector((state) =>state.user);
    const handleCheckout = async () => {
      try {
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems,
            cartTotalAmount,
            deliveryfee,
            userId: currentUser._id,
          }),
        });
  
        const data = await response.json();
  
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('No URL returned from Stripe session creation');
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    };
  
    return (
      <button
        onClick={handleCheckout}
        className="mt-4 w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white"
      >
        Proceed to Payment
      </button>
    );
  };
  
  export default PayButton;
  